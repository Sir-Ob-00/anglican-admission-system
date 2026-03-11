import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import { useAuth } from "../../context/AuthContext";

export default function StaffSignInModal({ open, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { username: "admin", password: "admin123" },
  });

  return (
    <Modal open={open} title="Staff Sign In" onClose={onClose} closeOnBackdrop={true}>
      <div className="text-sm text-slate-600">
        Sign in to manage applicants, exams, admissions, payments, documents, and notifications.
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: "Admin", u: "admin", p: "admin123" },
          { label: "Headteacher", u: "headteacher", p: "head123" },
          { label: "Assistant", u: "assistant", p: "assist123" },
          { label: "Teacher", u: "teacher", p: "teach123" },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-900/5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-900/10"
            onClick={() => {
              setValue("username", b.u);
              setValue("password", b.p);
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={handleSubmit(async (values) => {
          await login(values);
          onClose?.();
          navigate(from, { replace: true });
        })}
      >
        <div>
          <label className="text-sm font-semibold text-slate-800">Username</label>
          <input
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none focus:border-blue-500"
            {...register("username", { required: "Username is required" })}
            placeholder="e.g., admin"
          />
          {errors.username && (
            <div className="mt-1 text-xs text-rose-700">{errors.username.message}</div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-800">Password</label>
          <input
            type="password"
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none focus:border-blue-500"
            {...register("password", { required: "Password is required" })}
            placeholder="••••••••"
          />
          {errors.password && (
            <div className="mt-1 text-xs text-rose-700">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </Modal>
  );
}

