import axios from "axios";

const baseUrl = "http://localhost:8080/api/";

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.response.config;

    if (error.response.status === 401) {
      const waitToken = await AxiosInstance.post("/auth/refresh_token");
      const { access_token } = waitToken.data;

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        // Modify the original request (e.g., refreshing the token)
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("_at", access_token);
        // Return the modified request
        return AxiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
