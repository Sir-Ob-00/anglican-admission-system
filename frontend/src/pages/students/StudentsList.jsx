import { useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";

const demo = [
  { id: "s1", name: "Amaka Nwosu", className: "Primary 3", status: "active" },
  { id: "s2", name: "Kofi Mensah", className: "Primary 5", status: "active" },
  { id: "s3", name: "Fatima Musa", className: "JSS 1", status: "inactive" },
];

export default function StudentsList() {
  const [rows] = useState(demo);
  const columns = useMemo(
    () => [
      { key: "name", header: "Student" },
      { key: "className", header: "Class" },
      {
        key: "status",
        header: "Status",
        render: (r) => (
          <Badge tone={r.status === "active" ? "success" : "neutral"}>
            {String(r.status).toUpperCase()}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Students" subtitle="Class teacher student list (placeholder)." />
      <Table title="Students List" rows={rows} columns={columns} />
    </div>
  );
}
