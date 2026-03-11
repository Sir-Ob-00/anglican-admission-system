import api from "./api";

export async function listExams(params) {
  const res = await api.get("/api/exams", { params });
  return res.data;
}

export async function getExam(id) {
  const res = await api.get(`/api/exams/${id}`);
  return res.data;
}

export async function getExamQuestions(id, params) {
  const res = await api.get(`/api/exams/${id}/questions`, { params });
  return res.data;
}

export async function submitExam(payload) {
  const res = await api.post("/api/exams/submit", payload);
  return res.data;
}
