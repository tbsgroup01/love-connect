import api from "./api.js";

export const getAllMatches = async () => {
    return await api.get("/matches");
};

export const getUserMatches = async () => {
    return await api.get("/matches/user-matches");
};

export const deleteMatch = async (id) => {
    return await api.delete(`/matches/${id}`);
};