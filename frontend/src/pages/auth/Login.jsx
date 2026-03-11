import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PublicNavbar from "../../components/layout/PublicNavbar";
import hero from "../../assets/images/anglican.webp";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
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

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-full bg-white">
      <PublicNavbar />

      <main className="mx-auto w-full max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                Staff Portal Sign In
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Use your staff account to manage applicants, exams, admissions, payments, documents,
                and notifications.
              </p>
            </div>

            <div className="mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Sign in</div>
              <div className="mt-1 text-sm text-slate-600">
                Demo shortcuts (backend optional):
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: "Admin", u: "admin", p: "admin123" },
                  { label: "Headteacher", u: "headteacher", p: "head123" },
                  { label: "Assistant", u: "assistant", p: "assist123" },
                  { label: "Teacher", u: "teacher", p: "teach123" },
                  { label: "Parent", u: "parent", p: "parent123" },
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
                className="mt-6 grid gap-4"
                onSubmit={handleSubmit(async (values) => {
                  await login(values);
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
                  className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Login"}
                </button>

                <div className="text-xs text-slate-500">
                  Token is stored in `localStorage` as `aas_token`.
                </div>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-50 shadow-sm">
              <img
                src={hero}
                alt="Students"
                className="aspect-[16/9] w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
