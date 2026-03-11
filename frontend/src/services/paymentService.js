import api from "./api";

export async function listPayments(params) {
  const res = await api.get("/api/payments", { params });
  return res.data;
}

export async function initiatePayment(payload) {
  const res = await api.post("/api/payments/initiate", payload);
  return res.data;
}

export async function verifyPayment(payload) {
  const res = await api.post("/api/payments/verify", payload);
  return res.data;
}
