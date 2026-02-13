const API_URL = "http://localhost:5000/api";

const getHeaders = (isFormData = false) => {
    const token = localStorage.getItem("token");
    const headers = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
};

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Wystąpił błąd");
    }
    return data;
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "GET",
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    post: async (endpoint, body) => {
        const isFormData = body instanceof FormData;
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: getHeaders(isFormData),
            body: isFormData ? body : JSON.stringify(body),
        });
        return handleResponse(response);
    },

    put: async (endpoint, body) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    delete: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};
