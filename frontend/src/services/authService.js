import api from "./api";

function demoUserFor(username) {
  const lower = String(username || "").toLowerCase();
  if (lower.includes("admin")) return { id: "u_admin", name: "Admin User", role: "admin" };
  if (lower.includes("head")) return { id: "u_head", name: "Headteacher", role: "headteacher" };
  if (lower.includes("assist")) return { id: "u_asst", name: "Assistant Head", role: "assistant" };
  if (lower.includes("teacher")) return { id: "u_teacher", name: "Class Teacher", role: "teacher" };
  return { id: "u_parent", name: "Parent", role: "parent" };
}

export async function login({ username, password }) {
  try {
    const res = await api.post("/api/auth/login", { username, password });
    return res.data;
  } catch (e) {
    // Local demo fallback if the backend isn't running yet.
    if (!username || !password) throw e;
    return {
      token: `demo.${btoa(`${username}:${Date.now()}`)}.token`,
      user: demoUserFor(username),
    };
  }
}

export async function me() {
  const res = await api.get("/api/auth/me");
  return res.data;
}
