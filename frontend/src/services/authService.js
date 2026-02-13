import { api } from "./apiService";

export const authService = {
    login: async (email, password) => {
        const data = await api.post("/login", { email, password });
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },

    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },

    getToken: () => {
        return localStorage.getItem("token");
    }
};
