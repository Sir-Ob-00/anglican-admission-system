import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PageHeader from "../../components/common/PageHeader";
import { formatDate, statusLabel, statusTone } from "../../utils/helpers";
import * as applicantService from "../../services/applicantService";

const demo = [
  {
    id: "a1",
    fullName: "Jane N. Okafor",
    classApplyingFor: "Primary 3",
    status: "pending_review",
    createdAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "a2",
    fullName: "David A. Mensah",
    classApplyingFor: "Primary 5",
    status: "exam_scheduled",
    createdAt: "2026-03-06T10:00:00.000Z",
  },
  {
    id: "a3",
    fullName: "Grace I. Nwosu",
    classApplyingFor: "JSS 1",
    status: "awaiting_payment",
    createdAt: "2026-03-03T10:00:00.000Z",
  },
];

export default function ApplicantsList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await applicantService.listApplicants();
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
      { key: "fullName", header: "Applicant" },
      { key: "classApplyingFor", header: "Class" },
      {
        key: "status",
        header: "Status",
        render: (r) => <Badge tone={statusTone(r.status)}>{statusLabel(r.status)}</Badge>,
      },
      { key: "createdAt", header: "Created", render: (r) => formatDate(r.createdAt) },
      {
        key: "actions",
        header: "Actions",
        render: (r) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/applicants/${r.id}`);
              }}
            >
              View
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-rose-600 px-3 text-xs font-semibold text-white hover:bg-rose-700"
              onClick={(e) => {
                e.stopPropagation();
                setConfirm(r);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Applicants"
        subtitle="Search, review, and manage admission applicants."
        right={
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
            onClick={() => navigate("/applicants/new")}
          >
            Add Applicant
          </button>
        }
      />

      <Table
        title="Applicants List"
        rows={rows}
        columns={columns}
        onRowClick={(r) => navigate(`/applicants/${r.id}`)}
        actions={
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-900/10"
            onClick={() => navigate("/applicants?status=pending_review")}
          >
            Pending Review
          </button>
        }
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        title="Delete applicant"
        message={`Delete ${confirm?.fullName || "this applicant"}? This cannot be undone.`}
        confirmText="Delete"
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          const target = confirm;
          setConfirm(null);
          try {
            await applicantService.deleteApplicant(target.id);
            setRows((r) => r.filter((x) => x.id !== target.id));
          } catch {
            setRows((r) => r.filter((x) => x.id !== target.id));
          }
        }}
      />
    </div>
  );
}
