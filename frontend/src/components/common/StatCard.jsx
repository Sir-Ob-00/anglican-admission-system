import { cx } from "../../utils/helpers";

export default function StatCard({ title, value, hint, tone = "brand" }) {
  const toneClass =
    tone === "brand"
      ? "from-[color:var(--brand)]/15 to-white/40"
      : tone === "teal"
        ? "from-[color:var(--brand2)]/15 to-white/40"
        : tone === "gold"
          ? "from-[color:var(--gold)]/18 to-white/40"
          : "from-slate-900/10 to-white/40";

  return (
    <div
      className={cx(
        "rounded-3xl border border-white/40 bg-gradient-to-br p-4 shadow-sm backdrop-blur-xl",
        toneClass
      )}
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">{title}</div>
      <div className="mt-1 font-display text-3xl font-semibold text-slate-900">{value}</div>
      {hint && <div className="mt-2 text-sm text-slate-600">{hint}</div>}
    </div>
  );
}
