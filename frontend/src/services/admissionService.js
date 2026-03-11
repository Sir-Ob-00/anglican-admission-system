import api from "./api";

export async function listAdmissions() {
  const res = await api.get("/api/admissions");
  return res.data;
}

export async function getAdmission(id) {
  const res = await api.get(`/api/admissions/${id}`);
  return res.data;
}

export async function approveAdmission(applicantId) {
  const res = await api.post("/api/admissions/approve", { applicantId });
  return res.data;
}

