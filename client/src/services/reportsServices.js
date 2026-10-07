import api from "./api.js";

// Create a report
export const createReport = async (reportData) => {
  const response = await api.post("/reports", reportData);
  return response.data;
};

// Get all reports (with optional filtering: status, search, page, limit)
export const getReports = async (params = {}) => {
  const response = await api.get("/reports", { params });
  return response.data;
};

// Get single report by ID
export const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

// Update report or report status
export const updateReport = async (id, data) => {
  const payload = typeof data === "string" ? { status: data } : data;
  const response = await api.put(`/reports/${id}`, payload);
  return response.data;
};

// Update report status specifically
export const updateReportStatus = async (id, status) => {
  const payload = typeof status === "string" ? { status } : status;
  const response = await api.put(`/reports/${id}/status`, payload);
  return response.data;
};

// Delete single report
export const deleteReport = async (id) => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};

// Bulk delete reports
export const deleteBulkReports = async (ids) => {
  const response = await api.delete("/reports/bulk", { data: { ids } });
  return response.data;
};
