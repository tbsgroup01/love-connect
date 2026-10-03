import api from "./api";
export const getPlans = () => api.get("/plans");
export const getPlanById = (id) => api.get(`/plans/${id}`);
export const deletePlan = (id) => api.delete(`/plans/${id}`);
export const updatePlan = (id, plan) => api.put(`/plans/${id}`, plan);
export const createPlan = (plan) => api.post("/plans", plan);
export const seedPlans = () => api.post("/plans/seed");

