import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

interface CustomConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// [요청 인터셉터]
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
        const cleanToken = token.startsWith('"') ? JSON.parse(token) : token;
        config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
});

// [응답 인터셉터]
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as CustomConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = (async () => {
                    try {
                        const rawRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
                        const refreshToken = rawRefreshToken?.startsWith('"') 
                            ? JSON.parse(rawRefreshToken) 
                            : rawRefreshToken;

                        // 1. 요청 바디 구조: { "refresh": "토큰값" } (명세 일치)
                        const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`, {
                            refresh: refreshToken,
                        });

                        // 2. 응답 데이터 구조: response.data.data 내부에 토큰이 있음 (중요!)
                        // 스웨거: { data: { accessToken: "...", refreshToken: "..." } }
                        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

                        if (!accessToken) throw new Error("No access token in response");

                        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(accessToken));
                        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, JSON.stringify(newRefreshToken));

                        return accessToken;
                    } catch (err) {
                        // 리프레시 실패 시 로그아웃 (이미지 로직 재현)
                        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
                        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
                        window.location.href = "/login";
                        return Promise.reject(err);
                    }
                })()
                .finally(() => {
                    refreshPromise = null;
                });
            }

            return refreshPromise.then((newAccessToken) => {
                if (newAccessToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosInstance.request(originalRequest);
                }
            });
        }

        return Promise.reject(error);
    }
);