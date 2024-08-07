import { Outlet } from "react-router-dom";
import Footer from "./footer";
import GlobalTheme from "./global-theme";
import LeftNavigation from "./left-nav";
import { useContext } from "react";
import Loading from "./loading";
import { AuthProivder } from "../../auth-provider";

const Layout = ({ navBar = false }: { navBar?: boolean }) => {
  const { isLoading } = useContext(AuthProivder);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GlobalTheme>
      {navBar && <LeftNavigation />}
      <main className="flex flex-col w-full min-h-screen p-5 gap-20">
        <section className="flex-1 overflow-y-auto ">{<Outlet />}</section>
        <Footer />
      </main>
    </GlobalTheme>
  );
};

export default Layout;
