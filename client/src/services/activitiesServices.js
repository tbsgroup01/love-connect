import api from "./api";

export const getActivities = () => api.get("/activities");
export const deleteActivity = (id) => api.delete(`/activities/${id}`);
export const createActivity = (activity) => api.post("/activities", activity);
