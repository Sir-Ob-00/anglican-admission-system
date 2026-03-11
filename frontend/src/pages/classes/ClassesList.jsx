import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { listClasses } from "../../services/classService";

const demo = [
  { id: "c1", name: "Primary 1", teacher: "Mr. Adebayo", students: 38 },
  { id: "c2", name: "Primary 3", teacher: "Mrs. Okeke", students: 41 },
  { id: "c3", name: "JSS 1", teacher: "Mr. Mensah", students: 36 },
];

export default function ClassesList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listClasses();
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
      { key: "name", header: "Class" },
      { key: "teacher", header: "Class Teacher", render: (r) => r.teacher?.name || r.teacher || "—" },
      { key: "students", header: "Capacity", render: (r) => r.capacity ?? r.students ?? "—" },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Classes" subtitle="Class lists and assignments (placeholder)." />
      <Table title="Classes List" rows={rows} columns={columns} />
    </div>
  );
}
