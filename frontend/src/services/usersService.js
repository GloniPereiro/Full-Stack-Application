import { api } from "./apiService";

export const usersService = {
    getAll: async () => {
        return await api.get("/users");
    },

    create: async (userData) => {
        return await api.post("/users/create", userData);
    },

    delete: async (id) => {
        return await api.delete(`/users/${id}`);
    },

    updateRole: async (id, role) => {
        return await api.put(`/users/${id}/role`, { role });
    }
};
