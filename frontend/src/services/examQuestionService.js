import api from "./api";

export async function listExamQuestions(params) {
  const res = await api.get("/api/exam-questions", { params });
  return res.data;
}

