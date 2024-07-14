import axios from "axios";

const baseUrl = "http://localhost:8080/api/";

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// export const AxiosInstancePrivate = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// AxiosInstancePrivate.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       const originalRequest = error.response.config;

//       const waitToken = await AxiosInstance.post("/auth/refresh_token");
//       const { access_token } = waitToken.data;

//       if (!originalRequest._retry && access_token) {
//         originalRequest._retry = true;

//         // Modify the original request (e.g., refreshing the token)
//         originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

//         return AxiosInstance(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
