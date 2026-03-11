import api from "./api";

export async function listClasses() {
  const res = await api.get("/api/classes");
  return res.data;
}

