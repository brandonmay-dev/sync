import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api");

let authTokenGetter: (() => Promise<string | null>) | null = null;

export const setAuthTokenGetter = (
  getter: (() => Promise<string | null>) | null,
) => {
  authTokenGetter = getter;
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = authTokenGetter ? await authTokenGetter() : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers?.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});
