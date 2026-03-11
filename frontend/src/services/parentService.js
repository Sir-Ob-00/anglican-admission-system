import api from "./api";

export async function listParents() {
  const res = await api.get("/api/parents");
  return res.data;
}

