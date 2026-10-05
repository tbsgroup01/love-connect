import api from "./api";

export const getAllUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateUserStatus = (id, status) =>
  api.put(`/users/${id}/status`, { status });

export const updateUserProfile = (id, profileData) =>
  api.put(`/users/${id}/profile`, profileData);

export const uploadProfileImage = (formData) =>
  api.post("/upload/profile", formData);
