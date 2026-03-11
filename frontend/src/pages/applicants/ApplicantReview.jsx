import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import Badge from "../../components/common/Badge";
import ConfirmDialog from "../../components/common/ConfirmDialog";

export default function ApplicantReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(null);

  const actions = useMemo(
    () => [
      {
        key: "approve",
        label: "Approve",
        tone: "success",
        message: "Approve this applicant and move them forward in the workflow?",
      },
      {
        key: "reject",
        label: "Reject",
        tone: "danger",
        message: "Reject this applicant? This should be used only with a clear reason.",
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Applicant Review"
        subtitle="Headteacher/Admin review actions."
        right={
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900/5 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-900/10"
            onClick={() => navigate(`/applicants/${id}`)}
          >
            Back to details
          </button>
        }
      />

      <Panel className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-display text-xl font-semibold text-slate-900">
              Review applicant {id}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Actions below are placeholders until the backend workflow endpoints are wired.
            </div>
          </div>
          <Badge tone="info">Workflow</Badge>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {actions.map((a) => (
            <button
              key={a.key}
              type="button"
              className={
                a.tone === "danger"
                  ? "inline-flex h-14 items-center justify-center rounded-3xl bg-rose-600 px-5 text-sm font-semibold text-white hover:bg-rose-700"
                  : "inline-flex h-14 items-center justify-center rounded-3xl bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-700"
              }
              onClick={() => setConfirm(a)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </Panel>

      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.label}
        message={confirm?.message}
        tone={confirm?.tone}
        confirmText={confirm?.label}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          setConfirm(null);
          navigate(`/applicants/${id}`);
        }}
      />
    </div>
  );
}
