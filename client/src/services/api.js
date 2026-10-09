import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("loveconnect_admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message = data?.message || "";
    const code = data?.code;

    // Detect if account is suspended or deactivated by admin
    if (
      status === 403 &&
      (code === "ACCOUNT_SUSPENDED" ||
        code === "ACCOUNT_DEACTIVATED" ||
        message.toLowerCase().includes("suspended") ||
        message.toLowerCase().includes("deactivated") ||
        message.toLowerCase().includes("not active"))
    ) {
      // Clear logged in session immediately
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("loveconnect_auth_change"));

      const warningMessage =
        message || "Your account has been deactivated or suspended. Please contact admin.";

      // Only redirect if not already on login or register pages
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/login") && !currentPath.includes("/register")) {
        window.location.href = `/login?status_warning=${encodeURIComponent(warningMessage)}`;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
