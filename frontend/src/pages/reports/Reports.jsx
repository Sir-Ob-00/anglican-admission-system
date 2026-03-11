import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import { getReports } from "../../services/reportService";

export default function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await getReports();
        if (!ignore) setReport(data);
      } catch {
        if (!ignore) setReport(null);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const byClass = useMemo(
    () => [
      ...(report?.applicantsByClass || []).map((x) => ({ name: x.class, value: x.count })),
    ],
    [report]
  );

  const payments = useMemo(
    () => [
      { name: "Total", total: (report?.paymentsSummary?.total || 0) / 1_000_000 },
    ],
    [report]
  );

  const colors = ["rgba(11,59,122,.75)", "rgba(10,159,141,.75)", "rgba(202,162,75,.8)", "rgba(15,23,42,.55)", "rgba(148,163,184,.8)"];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Reports"
        subtitle="Applicants by class, exam performance, admissions statistics, and payments summary."
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel className="p-4">
          <div className="font-display text-lg font-semibold text-slate-900">Applicants by class</div>
          <div className="mt-1 text-sm text-slate-600">
            Live from `GET /api/reports` (falls back gracefully if backend is unavailable).
          </div>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={byClass.length ? byClass : [{ name: "No data", value: 1 }]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={105}
                  innerRadius={60}
                  paddingAngle={3}
                >
                  {byClass.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="font-display text-lg font-semibold text-slate-900">Payments summary (₦M)</div>
          <div className="mt-1 text-sm text-slate-600">Live total verified payments.</div>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payments}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" />
                <XAxis dataKey="name" stroke="rgba(71,85,105,.9)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="total" fill="rgba(10,159,141,.75)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel className="p-5">
        <div className="font-display text-lg font-semibold text-slate-900">Backend integration</div>
        <div className="mt-2 text-sm text-slate-700">
          This UI uses `GET /api/reports`. Extend it with more report slices as needed.
        </div>
      </Panel>
    </div>
  );
}
