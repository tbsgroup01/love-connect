import api from "./api.js";

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const createAdmin = (data) => api.post("/auth/admin/create", data);
export const forgetPassword = (data) => api.post("/auth/forgot-password", data);
export const verifyResetOtp = (data) => api.post("/auth/verify-reset-otp", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
export const getAdminProfile = () => api.get("/auth/admin/profile");
export const updateAdminProfile = (data) => api.put("/auth/admin/profile", data);
export const googleLogin = (credential) => api.post("/auth/google-login", { credential });
export const sendOtp = (data) => api.post("/auth/send-otp", data);
export const verifyOtp = (data) => api.post("/auth/verify-otp", data);
