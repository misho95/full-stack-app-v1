import AuthButton from "../auth/auth-button";
import { useContext } from "react";
import { AuthProivder } from "../../app";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../utils/axios";

const LeftNavigation = () => {
  const { setUser, setLoading } = useContext(AuthProivder);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    AxiosInstance.post("/auth/signout").then(() => {
      localStorage.removeItem("_at");
      setUser(null);
      setLoading(true);
      navigate(0);
    });
  };

  return (
    <nav className=" w-[500px] h-screen sticky top-0 p-5">
      <AuthButton title={"LogOut"} onClick={handleLogOut} />
    </nav>
  );
};

export default LeftNavigation;
