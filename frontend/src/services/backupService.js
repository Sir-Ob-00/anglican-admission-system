import api from "./api";

export async function createBackup() {
  const res = await api.post("/api/backups/create");
  return res.data;
}

export async function listBackups() {
  const res = await api.get("/api/backups");
  return res.data;
}

