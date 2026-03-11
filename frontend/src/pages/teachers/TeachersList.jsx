import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { listTeachers } from "../../services/teacherService";

const demo = [
  { id: "t1", name: "Mr. Adebayo", subject: "Math", status: "active" },
  { id: "t2", name: "Mrs. Okeke", subject: "English", status: "active" },
  { id: "t3", name: "Mr. Mensah", subject: "Basic Science", status: "inactive" },
];

export default function TeachersList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listTeachers();
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
      { key: "name", header: "Teacher", render: (r) => r.user?.name || r.name },
      { key: "subject", header: "Subject", render: (r) => r.subject || r.user?.subject || "—" },
      {
        key: "status",
        header: "Status",
        render: () => <Badge tone="success">ACTIVE</Badge>,
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Teachers" subtitle="Teacher directory (placeholder)." />
      <Table title="Teachers List" rows={rows} columns={columns} />
    </div>
  );
}
