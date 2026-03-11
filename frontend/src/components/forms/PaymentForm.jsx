import { useForm } from "react-hook-form";

export default function PaymentForm({ initialValues, onSubmit, submitLabel = "Initiate Payment" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      applicantId: initialValues?.applicantId || "",
      amount: initialValues?.amount ?? 0,
      method: initialValues?.method || "bank_transfer",
      note: initialValues?.note || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="text-sm font-semibold text-slate-800">Applicant ID</label>
        <input
          className="mt-1 h-11 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-3 text-slate-900 outline-none focus:border-[color:var(--brand)]"
          {...register("applicantId", { required: "Applicant ID is required" })}
          placeholder="e.g., 65f1..."
        />
        {errors.applicantId && (
          <div className="mt-1 text-xs text-rose-700">{errors.applicantId.message}</div>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Amount</label>
        <input
          type="number"
          min={0}
          className="mt-1 h-11 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-3 text-slate-900 outline-none focus:border-[color:var(--brand)]"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: { value: 1, message: "Amount must be greater than 0" },
          })}
        />
        {errors.amount && <div className="mt-1 text-xs text-rose-700">{errors.amount.message}</div>}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Payment Method</label>
        <select
          className="mt-1 h-11 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-3 text-slate-900 outline-none focus:border-[color:var(--brand)]"
          {...register("method", { required: true })}
        >
          <option value="bank_transfer">Bank Transfer</option>
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-semibold text-slate-800">Note (optional)</label>
        <textarea
          rows={3}
          className="mt-1 w-full resize-none rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 text-slate-900 outline-none focus:border-[color:var(--brand)]"
          {...register("note")}
          placeholder="e.g., Admission fee for Primary 3"
        />
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
