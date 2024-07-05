import { useEffect } from "react";
import { useSessionUser } from "./global-context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AxiosInstance } from "./axios";

const ProtecedRoute = () => {
  const { user, setUser } = useSessionUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserFetch = async () => {
    const tkn = localStorage.getItem("_at");
    if (!tkn) {
      navigate("/auth/signin", { replace: true });
      return;
    }

    const res = await AxiosInstance.get("/auth/profile/", {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });

    console.log(res);

    if (!res.data.user) {
      navigate("/auth/signin", { replace: true });
      return;
    }

    setUser(res.data.user);
  };

  useEffect(() => {
    handleUserFetch();
  }, []);

  if (!user && !location.pathname.includes("auth")) {
    return null;
  }

  return <Outlet />;
};

export default ProtecedRoute;
