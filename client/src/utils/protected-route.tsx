import { useEffect } from "react";
import { useToken } from "./global-context";
import { Outlet, useNavigate } from "react-router-dom";
import { AxiosInstance } from "./axios";

const ProtecedRoute = () => {
  const navigate = useNavigate();

  const { token } = useToken();

  const checkToken = async () => {
    if (!token) {
      const res = await AxiosInstance.post("/auth/refresh_token");
      if (res.data.message === "Unauthorized") {
        navigate("/auth/signin", { replace: true });
      } else {
        console.log("client:", res);
      }
    } else {
      AxiosInstance.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = token;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  if (!token) {
    return null;
  }

  return <Outlet />;
};

export default ProtecedRoute;
