import api from "./api";

export async function listExamResults(params) {
  const res = await api.get("/api/exam-results", { params });
  return res.data;
}

