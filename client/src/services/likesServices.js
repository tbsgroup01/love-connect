import api from "./api";

export const likeUser = async (receiverId) => {
  return await api.post(`/likes/like/${receiverId}`);
};

export const removeLike = async (receiverId) => {
  return await api.delete(`/likes/like/${receiverId}`);
};

export const getLikes = async (params = {}) => {
  return await api.get("/likes", { params });
};