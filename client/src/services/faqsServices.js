import api from "./api";

export const getFaqs = () => api.get("/faqs");
export const getFaqById = (id) => api.get(`/faqs/${id}`);
export const deleteFaq = (id) => api.delete(`/faqs/${id}`);
export const updateFaq = (id, faq) => api.put(`/faqs/${id}`, faq);
export const createFaq = (faq) => api.post("/faqs", faq);
export const seedFaqs = () => api.post("/faqs/seed");
