import api from "./api";

export const createSupportMessage = (data) => api.post("/support", data);
export const getSupportMessages = (params) => api.get("/support", { params });
export const deleteSupportMessage = (id) => api.delete(`/support/${id}`);
