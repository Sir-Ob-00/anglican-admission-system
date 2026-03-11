import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from "recharts";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Panel from "../../components/common/Panel";

function roleCards(role) {
  switch (role) {
    case "admin":
      return [
        { title: "Total Applicants", value: "1,248", tone: "brand" },
        { title: "Total Admissions", value: "412", tone: "teal" },
        { title: "Total Teachers", value: "78", tone: "gold" },
        { title: "Total Classes", value: "36", tone: "neutral" },
        { title: "Total Payments", value: "₦ 12.4M", tone: "brand" },
        { title: "Recent Activity Logs", value: "31", tone: "teal" },
      ];
    case "headteacher":
      return [
        { title: "Pending Review", value: "46", tone: "brand" },
        { title: "Exams Scheduled", value: "9", tone: "gold" },
        { title: "Admissions Completed", value: "18", tone: "teal" },
        { title: "Payments Received", value: "₦ 2.1M", tone: "brand" },
      ];
    case "assistant":
      return [
        { title: "Awaiting Exam", value: "22", tone: "gold" },
        { title: "Results Pending", value: "11", tone: "brand" },
        { title: "Awaiting Confirmation", value: "7", tone: "teal" },
      ];
    case "teacher":
      return [
        { title: "Assigned Exams", value: "4", tone: "brand" },
        { title: "Pending Submissions", value: "13", tone: "gold" },
        { title: "Students in Class", value: "38", tone: "teal" },
      ];
    default:
      return [
        { title: "Applicant Status", value: "Exam Scheduled", tone: "brand" },
        { title: "Payment Status", value: "Awaiting Payment", tone: "gold" },
        { title: "Documents Uploaded", value: "2 / 3", tone: "teal" },
      ];
  }
}

export default function Dashboard() {
  const { role } = useAuth();

  const chartData = useMemo(
    () => [
      { name: "P1", applicants: 120, admitted: 42 },
      { name: "P2", applicants: 164, admitted: 55 },
      { name: "P3", applicants: 138, admitted: 49 },
      { name: "P4", applicants: 152, admitted: 53 },
      { name: "P5", applicants: 110, admitted: 37 },
      { name: "P6", applicants: 96, admitted: 31 },
    ],
    []
  );

  const cards = roleCards(role);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of applicants, exams, admissions, payments, and activity."
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <StatCard key={c.title} title={c.title} value={c.value} hint={c.hint} tone={c.tone} />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel className="p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="font-display text-lg font-semibold text-slate-900">
                Applicants vs Admissions
              </div>
              <div className="text-sm text-slate-600">By class (demo data).</div>
            </div>
            <div className="text-xs text-slate-600">Chart.js-ready, using Recharts here</div>
          </div>

          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" />
                <XAxis dataKey="name" stroke="rgba(71,85,105,.9)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="applicants" fill="rgba(11,59,122,.75)" radius={[10, 10, 0, 0]} />
                <Bar dataKey="admitted" fill="rgba(10,159,141,.75)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="font-display text-lg font-semibold text-slate-900">Next actions</div>
          <div className="mt-2 grid gap-2 text-sm text-slate-700">
            <div className="rounded-2xl bg-white/60 p-3">
              Review applicants in <span className="font-semibold">Pending Review</span>.
            </div>
            <div className="rounded-2xl bg-white/60 p-3">
              Schedule entrance exams and publish questions for the next cohort.
            </div>
            <div className="rounded-2xl bg-white/60 p-3">
              Follow up on <span className="font-semibold">Awaiting Payment</span> families.
            </div>
            <div className="rounded-2xl bg-white/60 p-3">
              Upload missing documents to unblock admissions decisions.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
