import { api } from "./apiService";

export const filesService = {
    upload: async (formData) => {
        return await api.post("/files/upload", formData);
    },

    getAll: async () => {
        return await api.get("/files");
    },

    delete: async (filename) => {
        return await api.delete(`/files/${filename}`);
    },

    rename: async (filename, newName) => {
        return await api.put(`/files/${filename}`, { newName });
    }
};
