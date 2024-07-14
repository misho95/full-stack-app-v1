import AuthButton from "../auth/auth-button";
import { useContext, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthProivder } from "../../auth-provider";
import { AxiosInstance } from "../../utils/axios";
import clsx from "clsx";
import NavButton from "../nav/nav-button";
import { useClickAway } from "@uidotdev/usehooks";
import { NavigationData } from "../nav/navigation-data";
import { HiOutlinePlusCircle, HiPlusCircle } from "react-icons/hi";
import { RiMessage2Fill, RiMessage2Line } from "react-icons/ri";

const LeftNavigation = () => {
  const { setUser, setLoading, setToken } = useContext(AuthProivder);
  const [navActive, setNavActive] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const ref: any = useClickAway(() => {
    if (location.pathname !== "/messages" || navActive !== "messages") {
      setNavActive(null);
    }
  });

  const handleLogOut = async () => {
    AxiosInstance.post("/auth/logout").then(() => {
      setToken(null);
      setUser(null);
      setLoading(true);
      navigate(0);
    });
  };

  const handleNavActive = (title: string) => {
    setNavActive(navActive === title ? null : title);
  };

  useLayoutEffect(() => {
    if (location.pathname === "/messages" && navActive === null) {
      setNavActive("messages");
    }
  }, [location.pathname, navActive]);

  return (
    <div
      ref={ref}
      className={clsx("h-screen sticky top-0 hidden sm:flex min-w-[18%] z-50 ")}
    >
      <nav
        className={clsx(
          "flex flex-col justify-between p-3 bg-slate50 border-r-[1px]",
          {
            "w-full ": !navActive,
            "w-[80px] ": navActive,
          }
        )}
      >
        <div className="flex flex-col gap-3">
          {NavigationData.slice(0, 4).map((nav) => {
            return (
              <NavButton
                key={nav.id}
                title={nav.title}
                navActive={navActive}
                Icon={nav.Icon}
                IconActive={nav.IconActive}
                navigate={nav.navigate}
                onClick={() => {
                  !nav.onClick
                    ? setNavActive(null)
                    : handleNavActive(nav.title);
                }}
                to={nav.to}
              />
            );
          })}
          <NavButton
            title="messages"
            navActive={navActive}
            Icon={RiMessage2Line}
            IconActive={RiMessage2Fill}
            navigate={false}
            onClick={() => {
              navigate("/messages");
            }}
            to="/message"
          />
          {NavigationData.slice(4).map((nav) => {
            return (
              <NavButton
                key={nav.id}
                title={nav.title}
                navActive={navActive}
                Icon={nav.Icon}
                IconActive={nav.IconActive}
                navigate={nav.navigate}
                onClick={() => {
                  !nav.onClick
                    ? setNavActive(null)
                    : handleNavActive(nav.title);
                }}
                to={nav.to}
              />
            );
          })}
          <NavButton
            title="create"
            navActive={navActive}
            Icon={HiOutlinePlusCircle}
            IconActive={HiPlusCircle}
            navigate={false}
            onClick={() => {
              console.log("test...");
            }}
            to="/create"
          />
        </div>
        <div>
          <AuthButton title="logout" onClick={handleLogOut} />
        </div>
      </nav>
      {navActive && (
        <div className="absolute bg-slate50 z-40 left-[80px] top-0 h-full w-[120%] p-5 rounded-lg shadow-[6px_0px_10px] shadow-slate300">
          {navActive}
        </div>
      )}
    </div>
  );
};

export default LeftNavigation;
