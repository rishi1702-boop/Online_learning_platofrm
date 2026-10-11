// API Base URL Configuration
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://online-learning-platform-aqix.onrender.com");

export { BASE_URL };
