import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { listParents } from "../../services/parentService";

const demo = [
  { id: "pa1", name: "Mrs. Okafor", phone: "+234 800 000 1111", linkedApplicants: 1 },
  { id: "pa2", name: "Mr. Mensah", phone: "+233 200 000 2222", linkedApplicants: 2 },
];

export default function ParentsList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listParents();
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
      { key: "name", header: "Parent", render: (r) => r.user?.name || r.name },
      { key: "phone", header: "Phone", render: (r) => r.phone || r.user?.phone || "—" },
      { key: "linkedApplicants", header: "Linked Applicants", render: () => "—" },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Parents" subtitle="Parent directory (placeholder)." />
      <Table title="Parents List" rows={rows} columns={columns} />
    </div>
  );
}
