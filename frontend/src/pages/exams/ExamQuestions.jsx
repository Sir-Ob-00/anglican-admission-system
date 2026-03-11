import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import Badge from "../../components/common/Badge";
import { getExamQuestions } from "../../services/examService";

const demoQuestions = [
  { id: "q1", text: "What is 12 + 8?", options: ["18", "20", "22", "24"], answer: "20" },
  { id: "q2", text: "Which word is a noun?", options: ["Run", "Happy", "School", "Quickly"], answer: "School" },
  { id: "q3", text: "What is 5 × 6?", options: ["11", "20", "30", "60"], answer: "30" },
];

export default function ExamQuestions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await getExamQuestions(id, { shuffle: false });
        const items = Array.isArray(data) ? data : data.items || [];
        if (!ignore) setQuestions(items);
      } catch {
        if (!ignore) setQuestions(demoQuestions);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div className="space-y-4">
      <PageHeader title="Exam Questions" subtitle="Question bank for the selected exam." />
      <Panel className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-display text-xl font-semibold text-slate-900">Exam {id}</div>
            <div className="mt-1 text-sm text-slate-600">
              Connect to `GET /api/exams/:id/questions` to load real questions.
            </div>
          </div>
          <Badge tone="info">Placeholder</Badge>
        </div>

        <div className="mt-5 space-y-3">
          {questions.map((q, idx) => (
            <div key={q.id || q._id} className="rounded-3xl bg-white/60 p-4">
              <div className="text-sm font-semibold text-slate-900">
                {idx + 1}. {q.text}
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {q.options.map((o) => (
                  <div key={o} className="rounded-2xl border border-slate-200/70 bg-white/70 px-3 py-2 text-sm">
                    {o}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
