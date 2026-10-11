import axios from "axios";
import { BASE_URL } from "../config";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000 // 15 seconds timeout
});

// Attach JWT token from localStorage if present (for reliable cross-domain requests)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear user data and token
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      
      // Don't redirect if we are already on login or register to avoid loops
      const path = window.location.pathname;
      if (path !== "/login" && path !== "/register" && path !== "/") {
         window.location.href = "/login";
      } else if (path === "/") {
         // if on home page, just reload to update navbar state to unauthenticated
         window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);