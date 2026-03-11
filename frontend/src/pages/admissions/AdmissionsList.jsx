import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import * as admissionService from "../../services/admissionService";

const demo = [
  { id: "ad1", applicant: "Jane N. Okafor", classLevel: "Primary 3", status: "admitted", date: "2026-03-05T10:00:00.000Z" },
  { id: "ad2", applicant: "David A. Mensah", classLevel: "Primary 5", status: "rejected", date: "2026-03-04T10:00:00.000Z" },
];

export default function AdmissionsList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await admissionService.listAdmissions();
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
      { key: "applicant", header: "Applicant" },
      { key: "classLevel", header: "Class" },
      {
        key: "status",
        header: "Decision",
        render: (r) => (
          <Badge tone={r.status === "admitted" ? "success" : r.status === "rejected" ? "danger" : "neutral"}>
            {String(r.status).toUpperCase()}
          </Badge>
        ),
      },
      { key: "date", header: "Date", render: (r) => formatDate(r.date) },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Admissions" subtitle="Final admission decisions and records." />
      <Table
        title="Admissions List"
        rows={rows.map((x) => ({
          id: x._id || x.id,
          applicant: x.applicant?.fullName || "—",
          classLevel: x.applicant?.classApplyingFor || "—",
          status: "admitted",
          date: x.approvedAt || x.createdAt,
        }))}
        columns={columns}
        onRowClick={(r) => navigate(`/admissions/${r.id}`)}
      />
    </div>
  );
}
