import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cx } from "../../utils/helpers";
import logo from "../../assets/images/anglican.webp";

const roleMenus = {
  admin: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/applicants", label: "Applicants" },
    { to: "/admissions", label: "Admissions" },
    { to: "/reports", label: "Reports" },
    { to: "/teachers", label: "Teachers" },
    { to: "/classes", label: "Classes" },
    { to: "/payments", label: "Payments" },
    { to: "/notifications", label: "Notifications" },
    { to: "/settings/logs", label: "Activity Logs" },
    { to: "/settings/backup", label: "System Backup" },
    { to: "/settings/users", label: "Manage Users" },
  ],
  headteacher: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/applicants/new", label: "Add Applicant" },
    { to: "/applicants", label: "Applicants" },
    { to: "/admissions", label: "Admissions" },
    { to: "/teachers", label: "Teachers" },
    { to: "/classes", label: "Classes" },
    { to: "/parents", label: "Parents" },
    { to: "/parents/link", label: "Link Parents" },
    { to: "/payments", label: "Payments" },
    { to: "/reports", label: "Reports" },
    { to: "/notifications", label: "Notifications" },
    { to: "/settings/logs", label: "Activity Logs" },
    { to: "/settings/users", label: "Users" },
  ],
  assistant: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/applicants/new", label: "Add Applicant" },
    { to: "/applicants", label: "Applicants" },
    { to: "/admissions", label: "Admissions" },
    { to: "/teachers", label: "Teachers" },
    { to: "/classes", label: "Classes" },
    { to: "/parents", label: "Parents" },
    { to: "/payments", label: "Payments" },
    { to: "/reports", label: "Reports" },
    { to: "/documents", label: "Documents" },
    { to: "/notifications", label: "Notifications" },
  ],
  teacher: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/exams", label: "Entrance Exams" },
    { to: "/exams", label: "Enter Exam Scores" },
    { to: "/classes", label: "Classes" },
    { to: "/students", label: "Students" },
    { to: "/reports", label: "Reports" },
    { to: "/documents", label: "Documents" },
    { to: "/notifications", label: "Notifications" },
  ],
  parent: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/applicants", label: "Applicant Status" },
    { to: "/documents", label: "Upload Documents" },
    { to: "/payments", label: "Payments" },
    { to: "/reports", label: "Reports" },
    { to: "/notifications", label: "Notifications" },
  ],
};

function navItemClass({ isActive }) {
  return cx(
    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
    "hover:bg-white/70 hover:shadow-sm",
    isActive ? "bg-white shadow-sm text-slate-900" : "text-slate-700"
  );
}

export default function Sidebar({ open, onClose }) {
  const { role } = useAuth();
  const items = roleMenus[role] || roleMenus.parent;

  return (
    <>
      <div
        className={cx(
          "fixed inset-0 z-30 bg-slate-900/35 backdrop-blur-sm md:hidden",
          open ? "block" : "hidden"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cx(
          "fixed left-3 top-3 z-40 h-[calc(100%-1.5rem)] w-[280px] rounded-3xl border border-white/40 bg-white/60 p-3 shadow-xl backdrop-blur-xl",
          "md:sticky md:left-auto md:top-4 md:z-auto md:block md:h-[calc(100vh-2rem)]",
          open ? "block" : "hidden md:block"
        )}
        aria-label="Sidebar"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
          <img
            src={logo}
            alt="Anglican School"
            className="h-10 w-10 rounded-2xl object-cover"
          />
          <div className="min-w-0">
            <div className="truncate font-semibold text-slate-900">Admission System</div>
            <div className="truncate text-xs text-slate-600">Anglican School</div>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/5 text-slate-700 md:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="mt-3 flex flex-col gap-1 px-1">
          {items.map((it) => (
            <NavLink key={`${it.to}:${it.label}`} to={it.to} className={navItemClass} end>
              <span className="text-base leading-none">▸</span>
              <span className="truncate">{it.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-1 pt-3">
          <div className="rounded-2xl border border-white/40 bg-gradient-to-br from-white/60 to-white/30 p-3 text-xs text-slate-700">
            <div className="font-semibold text-slate-900">Tip</div>
            <div className="mt-1 leading-relaxed">
              Set `VITE_API_BASE_URL` to point this UI at your backend API.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
