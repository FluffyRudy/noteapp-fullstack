import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export { API };
