import { useEffect } from "react";
import { useSessionUser } from "./global-context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtecedRoute = () => {
  const location = useLocation();

  const { user } = useSessionUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !location.pathname.includes("auth")) {
      navigate("/auth/signin", { replace: true });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <Outlet />;
};

export default ProtecedRoute;
