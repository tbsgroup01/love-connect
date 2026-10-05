import api from "./api.js";

export const getSubscriptions = async (params = {}) =>
  await api.get("/subscriptions", { params });

export const checkActiveSubscription = async (user_id) =>
  await api.post("/subscriptions/check", { user_id });

export const deleteSubscription = async (id) =>
  await api.delete(`/subscriptions/${id}`);