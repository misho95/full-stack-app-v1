import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/shared/layout";
import { createContext, useEffect, useState } from "react";
import AuthSignInPage from "./pages/auth-signin";
import AuthSignUpPage from "./pages/auth-signup";
import { AxiosInstance } from "./utils/axios";
import Loading from "./components/shared/loading";

export const AuthProivder = createContext<any>(null);

const App = () => {
  console.log("testing...");

  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleUserApi = async () => {
    const tkn = localStorage.getItem("_at");
    if (!tkn) {
      setLoading(false);
      return;
    }
    const response = await AxiosInstance.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });

    if (response.status === 403) {
      setLoading(false);
      return;
    }

    setUser(response.data.user);
    setLoading(false);
  };

  useEffect(() => {
    handleUserApi();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to={user ? "/" : "/auth/signin"} />,
    },
    user
      ? {
          path: "/",
          element: <Layout navBar />,
          children: [
            {
              path: "/",
              element: "landing pageee.......",
              index: true,
            },
          ],
        }
      : {
          path: "/auth/",
          element: <Layout />,
          children: [
            {
              path: "signin",
              element: <AuthSignInPage />,
              index: true,
            },
            {
              path: "signup",
              element: <AuthSignUpPage />,
            },
          ],
        },
  ]);

  return (
    <AuthProivder.Provider value={{ user, setUser, isLoading, setLoading }}>
      <RouterProvider router={router} />
    </AuthProivder.Provider>
  );
};

export default App;
