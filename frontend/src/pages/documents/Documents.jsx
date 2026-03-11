import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import DocumentUpload from "../../components/forms/DocumentUpload";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import * as documentService from "../../services/documentService";
import * as applicantService from "../../services/applicantService";

const demo = [
  { id: "d1", documentType: "birth_certificate", fileName: "birth-certificate.pdf", uploadedAt: "2026-03-07T10:00:00.000Z", status: "uploaded" },
  { id: "d2", documentType: "passport_photo", fileName: "passport.png", uploadedAt: "2026-03-06T10:00:00.000Z", status: "uploaded" },
];

export default function Documents() {
  const [rows, setRows] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const [a, d] = await Promise.all([
          applicantService.listApplicants(),
          documentService.listDocuments(),
        ]);
        const aItems = Array.isArray(a) ? a : a.items || [];
        if (!ignore) setApplicants(aItems);

        const data = d;
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

  useEffect(() => {
    let ignore = false;
    if (!selectedApplicantId) return;
    (async () => {
      try {
        const data = await documentService.listDocuments({ applicantId: selectedApplicantId });
        const items = Array.isArray(data) ? data : data.items || [];
        if (!ignore) setRows(items);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      ignore = true;
    };
  }, [selectedApplicantId]);

  const columns = useMemo(
    () => [
      {
        key: "applicant",
        header: "Applicant",
        render: (r) => r.applicant?.fullName || "—",
      },
      {
        key: "documentType",
        header: "Document Type",
        render: (r) => String(r.documentType || "—").replaceAll("_", " "),
      },
      { key: "originalName", header: "File" },
      { key: "createdAt", header: "Uploaded", render: (r) => formatDate(r.createdAt || r.uploadedAt) },
      {
        key: "status",
        header: "Status",
        render: (r) => (
          <Badge tone="success">{r.status ? r.status : "uploaded"}</Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Documents" subtitle="Upload and manage applicant documents." />
      <Panel className="p-5">
        <div className="font-display text-lg font-semibold text-slate-900">Upload Document</div>
        <div className="mt-1 text-sm text-slate-600">Submit to `POST /api/documents/upload`.</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-800">Applicant</label>
            <select
              value={selectedApplicantId}
              onChange={(e) => setSelectedApplicantId(e.target.value)}
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-3 text-slate-900 outline-none focus:border-[color:var(--brand)]"
            >
              <option value="">Select applicant...</option>
              {applicants.map((a) => (
                <option key={a.id || a._id} value={a.id || a._id}>
                  {a.fullName} ({a.classApplyingFor})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <DocumentUpload
            onSubmit={async ({ documentType, file }) => {
              const f = file?.[0];
              if (!f) return;
              if (!selectedApplicantId) {
                alert("Select an applicant first.");
                return;
              }
              try {
                const created = await documentService.uploadDocument({
                  applicantId: selectedApplicantId,
                  documentType,
                  file: f,
                });
                setRows((r) => [created, ...r]);
              } catch {
                alert("Upload failed. Check your backend server and try again.");
              }
            }}
          />
        </div>
      </Panel>

      <Table title="Uploaded Documents" rows={rows} columns={columns} />
    </div>
  );
}
