import api from "./api";

export async function listTeachers() {
  const res = await api.get("/api/teachers");
  return res.data;
}

