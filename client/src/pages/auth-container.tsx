import { ReactNode, useEffect } from "react";
import { useSessionUser } from "../utils/global-context";
import { useNavigate } from "react-router-dom";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const { user } = useSessionUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return children;
};

export default AuthContainer;
