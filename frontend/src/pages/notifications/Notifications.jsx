import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import * as notificationService from "../../services/notificationService";

export default function Notifications() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await notificationService.listNotifications();
        const items = Array.isArray(data) ? data : data.items || [];
        if (!ignore) setRows(items);
      } catch {
        if (!ignore) setRows([]);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const columns = useMemo(
    () => [
      { key: "message", header: "Message" },
      { key: "createdAt", header: "Date", render: (r) => formatDate(r.createdAt) },
      {
        key: "read",
        header: "Status",
        render: (r) => <Badge tone={r.read ? "neutral" : "warning"}>{r.read ? "Read" : "Unread"}</Badge>,
      },
      {
        key: "actions",
        header: "Actions",
        render: (r) => (
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10 disabled:opacity-50"
            disabled={r.read}
            onClick={async () => {
              const nid = r._id || r.id;
              try {
                await notificationService.markNotificationRead(nid);
              } catch {
                /* ignore */
              }
              setRows((prev) =>
                prev.map((x) => ((x._id || x.id) === nid ? { ...x, read: true } : x))
              );
            }}
          >
            Mark read
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Notifications" subtitle="System alerts for exams, payments, and approvals." />
      <Table
        title="Notifications"
        rows={rows}
        columns={columns}
        searchable={true}
        rowKey="_id"
      />
    </div>
  );
}
