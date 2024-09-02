import axios from "axios";
import { ACCESS_TOKEN, ENDPOINTS, REFRESH_TOKEN } from "./constants";

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

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            try {
                const response = await API.post(
                    ENDPOINTS.NEW_REFRESH_TOKEN.route,
                    { refresh: refreshToken }
                );

                if (response.status === 200) {
                    const { access, refresh } = response.data;
                    localStorage.setItem(ACCESS_TOKEN, access);
                    localStorage.setItem(REFRESH_TOKEN, refresh);

                    API.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${access}`;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${access}`;

                    return API(originalRequest);
                }
            } catch (err) {
                console.error("Token refresh failed:", err);
            }
        }

        return Promise.reject(error);
    }
);

export { API };
