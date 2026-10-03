import api from "./api";

export const getBanners = () => api.get("/banners");
export const deleteBanner = (id) => api.delete(`/banners/${id}`);
export const updateBanner = (id, banner) => api.put(`/banners/${id}`, banner);
export const createBanner = (banner) => api.post("/banners", banner);
export const getPublishedBanners = () => api.get("/banners/published");
