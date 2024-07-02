import axios from "axios";

const baseUrl = "http://localhost:8080/api/";

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
