import { useForm } from "react-hook-form";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";

export default function LinkParent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { parentId: "", applicantId: "" } });

  return (
    <div className="space-y-4">
      <PageHeader title="Link Parents" subtitle="Link a parent account to an applicant (placeholder)." />
      <Panel className="p-5">
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={handleSubmit(async () => {
            await new Promise((r) => setTimeout(r, 350));
            alert("Linked (placeholder).");
          })}
        >
          <div>
            <label className="text-sm font-semibold text-slate-800">Parent ID</label>
            <input
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-3 text-slate-900 outline-none focus:border-[color:var(--brand)]"
              {...register("parentId", { required: true })}
              placeholder="Parent user id"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-800">Applicant ID</label>
            <input
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-3 text-slate-900 outline-none focus:border-[color:var(--brand)]"
              {...register("applicantId", { required: true })}
              placeholder="Applicant id"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110 disabled:opacity-60"
            >
              {isSubmitting ? "Linking..." : "Link Parent"}
            </button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
