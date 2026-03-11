import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { formatDate } from "../../utils/helpers";
import { listActivityLogs } from "../../services/activityLogService";

const demo = [
  { id: "l1", user: "Admin User", action: "Created applicant record", date: "2026-03-07T10:00:00.000Z", ip: "192.168.1.2" },
  { id: "l2", user: "Headteacher", action: "Approved admission", date: "2026-03-05T10:00:00.000Z", ip: "192.168.1.4" },
  { id: "l3", user: "Parent", action: "Uploaded birth certificate", date: "2026-03-04T10:00:00.000Z", ip: "192.168.1.18" },
];

export default function ActivityLogs() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listActivityLogs({ limit: 200 });
        const items = Array.isArray(data) ? data : data.items || [];
        if (!ignore) setRows(items);
      } catch {
        if (!ignore) setRows(demo);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);
  const columns = useMemo(
    () => [
      { key: "user", header: "User", render: (r) => r.user?.name || r.user || "—" },
      { key: "action", header: "Action" },
      { key: "date", header: "Date", render: (r) => formatDate(r.timestamp || r.date) },
      { key: "ip", header: "IP Address", render: (r) => r.ipAddress || r.ip || "—" },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Activity Logs" subtitle="Audit log of system actions." />
      <Table title="Activity Logs" rows={rows} columns={columns} searchable={true} />
    </div>
  );
}
