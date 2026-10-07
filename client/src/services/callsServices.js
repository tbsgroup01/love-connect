import api from "./api.js";

export const createCall = async (payload) => {
  const response = await api.post("/calls/create", payload);
  return response.data;
};

export const acceptCall = async (payload) => {
  const response = await api.post("/calls/accept", payload);
  return response.data;
};

export const rejectCall = async (payload) => {
  const response = await api.post("/calls/reject", payload);
  return response.data;
};

export const endCall = async (payload) => {
  const response = await api.post("/calls/end", payload);
  return response.data;
};

export const getAllCalls = async (params = {}) => {
  const response = await api.get("/calls/all", { params });
  return response.data;
};

export const getUserCalls = async () => {
  const response = await api.get("/calls/my-calls");
  return response.data;
};

export const deleteCall = async (id) => {
  const response = await api.delete(`/calls/${id}`);
  return response.data;
};

export const deleteBulkCalls = async (ids) => {
  const response = await api.delete("/calls/bulk", { data: { ids } });
  return response.data;
};