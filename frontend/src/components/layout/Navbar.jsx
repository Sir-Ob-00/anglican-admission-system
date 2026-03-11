import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { listNotifications } from "../../services/notificationService";
import { cx, formatDate } from "../../utils/helpers";

function roleLabel(role) {
  switch (role) {
    case "admin":
      return "Admin";
    case "headteacher":
      return "Headteacher";
    case "assistant":
      return "Assistant Head";
    case "teacher":
      return "Class Teacher";
    default:
      return "Parent";
  }
}

export default function Navbar({ onToggleSidebar }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listNotifications({ limit: 5 });
        if (!ignore) setItems(Array.isArray(data) ? data : data.items || []);
      } catch {
        if (!ignore) {
          setItems([
            {
              id: "n1",
              message: "Welcome. This is a demo notification while the backend is offline.",
              createdAt: new Date().toISOString(),
              read: false,
            },
          ]);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  return (
    <header className="sticky top-3 z-20">
      <div className="flex items-center gap-3 rounded-3xl border border-white/40 bg-white/60 px-3 py-3 shadow-lg backdrop-blur-xl md:px-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-800 md:hidden"
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className="min-w-0">
          <div className="font-display text-lg font-semibold text-slate-900 md:text-xl">
            Anglican School
          </div>
          <div className="truncate text-xs text-slate-600">
            {roleLabel(role)} dashboard and workflows
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              className={cx(
                "relative inline-flex h-10 items-center justify-center rounded-2xl px-3 text-sm",
                "bg-slate-900/5 text-slate-800 hover:bg-slate-900/10"
              )}
              onClick={() => setOpen((s) => !s)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--brand)] px-1 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-[320px] overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
                  <div className="font-semibold text-slate-900">Recent alerts</div>
                  <Link
                    to="/notifications"
                    className="text-sm font-semibold text-[color:var(--brand)] hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    View all
                  </Link>
                </div>
                <div className="max-h-[320px] overflow-auto p-2">
                  {items.length === 0 ? (
                    <div className="p-3 text-sm text-slate-600">No notifications.</div>
                  ) : (
                    items.map((n) => (
                      <div
                        key={n.id}
                        className={cx(
                          "rounded-2xl p-3 text-sm",
                          n.read ? "text-slate-700" : "bg-[color:var(--bg0)] text-slate-900"
                        )}
                      >
                        <div className="leading-snug">{n.message}</div>
                        <div className="mt-1 text-xs text-slate-500">{formatDate(n.createdAt)}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden rounded-2xl bg-white/60 px-3 py-2 text-sm text-slate-700 md:block">
            <div className="font-semibold text-slate-900">{user?.name || "User"}</div>
            <div className="text-xs">{roleLabel(role)}</div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-4 text-sm font-semibold text-white shadow-sm hover:brightness-110"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
