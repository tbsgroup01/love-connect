import api from "./api";
export const createReport = (report) => api.post("/reports", report);
export const getReports = () => api.get("/reports");
export const getReportById = (id) => api.get(`/reports/${id}`);
export const deleteReport = (id) => api.delete(`/reports/${id}`);
export const updateReport = (id, status) =>
  api.put(`/reports/${id}/status`, status);
