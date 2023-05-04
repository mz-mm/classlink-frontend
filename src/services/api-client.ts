import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Add an axios interceptor to update the Authorization header before each request is sent
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
