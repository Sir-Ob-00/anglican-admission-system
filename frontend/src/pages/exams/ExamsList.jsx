import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import * as examService from "../../services/examService";

const demo = [
  {
    id: "e1",
    title: "Entrance Exam - Math",
    classLevel: "Primary 3",
    scheduledAt: "2026-03-12T09:00:00.000Z",
    durationMinutes: 30,
    status: "scheduled",
  },
  {
    id: "e2",
    title: "Entrance Exam - English",
    classLevel: "Primary 5",
    scheduledAt: "2026-03-13T09:00:00.000Z",
    durationMinutes: 25,
    status: "draft",
  },
];

export default function ExamsList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await examService.listExams();
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
        render: (r) => (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/exams/${r.id}/questions`);
              }}
            >
              Questions
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/exams/${r.id}/results`);
              }}
            >
              Results
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-3 text-xs font-semibold text-white hover:brightness-110"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/exams/${r.id}/take`);
              }}
            >
              Take Exam
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Entrance Exams" subtitle="Schedule, conduct, and review entrance exams." />
      <Table title="Exams List" rows={rows} columns={columns} />
    </div>
  );
}
