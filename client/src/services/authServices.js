import api from "./api.js";

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const createAdmin = (data) => api.post("/auth/admin/create", data);
export const forgetPassword = (data) => api.post("/auth/forgot-password", data);
export const verifyResetOtp = (data) =>
  api.post("/auth/verify-reset-otp", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
