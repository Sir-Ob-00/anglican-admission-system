import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import * as examService from "../../services/examService";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/common/Modal";
import ExamForm from "../../components/forms/ExamForm";

export default function ExamsList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const { role } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await examService.listExams();
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
      { key: "title", header: "Exam" },
      { key: "classLevel", header: "Class" },
      { key: "scheduledAt", header: "Scheduled", render: (r) => formatDate(r.scheduledAt) },
      { key: "durationMinutes", header: "Duration", render: (r) => `${r.durationMinutes} min` },
      {
        key: "status",
        header: "Status",
        render: (r) => (
          <Badge tone={r.status === "scheduled" ? "warning" : r.status === "completed" ? "success" : "neutral"}>
            {String(r.status).toUpperCase()}
          </Badge>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (r) => {
          const examId = r._id || r.id;
          return (
            <div className="flex flex-wrap items-center gap-2">
            {(role === "teacher" || role === "assistantHeadteacher") && r.code && r.status === "active" ? (
              <a
                href={`/entrance-exam/${encodeURIComponent(r.code)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-3 text-xs font-semibold text-white hover:brightness-110"
                onClick={(e) => e.stopPropagation()}
              >
                Exam Link
              </a>
            ) : null}
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/exams/${examId}/questions`);
              }}
            >
              Questions
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/exams/${examId}/results`);
              }}
            >
              Results
            </button>
          </div>
          );
        },
      },
    ],
    [navigate, role]
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Entrance Exams"
        subtitle="Schedule, conduct, and review entrance exams."
        right={
          role === "headteacher" ? (
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
              onClick={() => setOpen(true)}
            >
              Create Exam
            </button>
          ) : null
        }
      />
      <Table title="Exams List" rows={rows} columns={columns} />

      <Modal open={open} title="Create Exam" onClose={() => setOpen(false)}>
        <ExamForm
          submitLabel="Create"
          onSubmit={async (values) => {
            try {
              await examService.createExam(values);
              const data = await examService.listExams();
              const items = Array.isArray(data) ? data : data.items || [];
              setRows(items);
              setOpen(false);
            } catch {
              alert("Create exam failed. Headteacher role required.");
            }
          }}
        />
      </Modal>
    </div>
  );
}
