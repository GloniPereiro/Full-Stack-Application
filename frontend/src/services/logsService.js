import { api } from "./apiService";

export const logsService = {
    getAll: async () => {
        return await api.get("/logs");
    }
};
