import AuthButton from "../auth/auth-button";
import { useContext } from "react";
import { AuthProivder } from "../../app";

const LeftNavigation = () => {
  const { setUser } = useContext(AuthProivder);

  const handleLogOut = () => {
    localStorage.removeItem("_at");
    setUser(null);
  };

  return (
    <nav className=" w-[500px] h-screen sticky top-0 p-5">
      <AuthButton title={"LogOut"} onClick={handleLogOut} />
    </nav>
  );
};

export default LeftNavigation;
