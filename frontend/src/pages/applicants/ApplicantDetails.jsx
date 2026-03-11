import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import Badge from "../../components/common/Badge";
import StatusPipeline from "../../components/common/StatusPipeline";
import { formatDate, statusLabel, statusTone } from "../../utils/helpers";
import * as applicantService from "../../services/applicantService";

export default function ApplicantDetails() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await applicantService.getApplicant(id);
        if (!ignore) setApplicant(data);
      } catch {
        if (!ignore)
          setApplicant({
            id,
            fullName: "Demo Applicant",
            dateOfBirth: "2014-02-11",
            gender: "female",
            classApplyingFor: "Primary 3",
            parentContact: "+234 800 000 0000",
            address: "Demo address",
            status: "exam_scheduled",
            createdAt: "2026-03-07T10:00:00.000Z",
            examStatus: "scheduled",
            paymentStatus: "awaiting_payment",
            documents: [
              { type: "birth_certificate", status: "uploaded" },
              { type: "passport_photo", status: "missing" },
            ],
          });
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!applicant) {
    return (
      <div className="space-y-4">
        <PageHeader title="Applicant Details" subtitle="Loading applicant record..." />
        <Panel>Loading...</Panel>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Applicant Details"
        subtitle="Profile, exam status, payment status, documents, and admission progress."
        right={
          <Link
            to={`/applicants/${id}/review`}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
          >
            Review
          </Link>
        }
      />

      <div className="grid gap-3 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-display text-2xl font-semibold text-slate-900">
                {applicant.fullName}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Created {formatDate(applicant.createdAt)}
              </div>
            </div>
            <Badge tone={statusTone(applicant.status)}>{statusLabel(applicant.status)}</Badge>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white/60 p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Date of Birth
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {applicant.dateOfBirth || "—"}
              </div>
            </div>
            <div className="rounded-2xl bg-white/60 p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Gender
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {String(applicant.gender || "—")}
              </div>
            </div>
            <div className="rounded-2xl bg-white/60 p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Class Applying For
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {applicant.classApplyingFor || "—"}
              </div>
            </div>
            <div className="rounded-2xl bg-white/60 p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Parent Contact
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {applicant.parentContact || "—"}
              </div>
            </div>
            <div className="rounded-2xl bg-white/60 p-3 md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Address
              </div>
              <div className="mt-1 text-sm text-slate-800">{applicant.address || "—"}</div>
            </div>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel>
            <div className="font-semibold text-slate-900">Exam</div>
            <div className="mt-2 text-sm text-slate-700">
              Status: <span className="font-semibold">{applicant.examStatus || "—"}</span>
            </div>
            <Link
              to="/exams"
              className="mt-3 inline-flex h-10 items-center justify-center rounded-2xl bg-slate-900/5 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-900/10"
            >
              Go to exams
            </Link>
          </Panel>

          <Panel>
            <div className="font-semibold text-slate-900">Payment</div>
            <div className="mt-2 text-sm text-slate-700">
              Status: <span className="font-semibold">{applicant.paymentStatus || "—"}</span>
            </div>
            <Link
              to="/payments"
              className="mt-3 inline-flex h-10 items-center justify-center rounded-2xl bg-slate-900/5 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-900/10"
            >
              Go to payments
            </Link>
          </Panel>

          <Panel>
            <div className="font-semibold text-slate-900">Documents</div>
            <div className="mt-2 space-y-2 text-sm text-slate-700">
              {(applicant.documents || []).map((d, i) => (
                <div key={`${d.type}-${i}`} className="flex items-center justify-between">
                  <div className="capitalize">{String(d.type || "").replaceAll("_", " ")}</div>
                  <Badge tone={d.status === "uploaded" ? "success" : "warning"}>
                    {d.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link
              to="/documents"
              className="mt-3 inline-flex h-10 items-center justify-center rounded-2xl bg-slate-900/5 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-900/10"
            >
              Manage documents
            </Link>
          </Panel>
        </div>
      </div>

      <StatusPipeline status={applicant.status} />
    </div>
  );
}
