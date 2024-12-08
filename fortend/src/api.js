import axios from "axios";

const token = localStorage.getItem("authToken");

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    },
});

export const setAuthToken = (newToken) => {
    localStorage.setItem("authToken", newToken);
    api.defaults.headers.Authorization = `Bearer ${newToken}`;
};

export default api;
