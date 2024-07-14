import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/shared/layout";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthSignInPage from "./pages/auth-signin";
import AuthSignUpPage from "./pages/auth-signup";
import { AxiosInstance } from "./utils/axios";
import Loading from "./components/shared/loading";
import { AuthProivder } from "./auth-provider";
import { UserType } from "./utils/types";
import HomeIndex from "./pages/home-index";

const App = () => {
  const [token, setToken] = useState<null | string>(null);
  const [user, setUser] = useState<null | UserType>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const cancelLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 50);
  };

  useEffect(() => {
    console.log("testing...");
    const handleUserApi = async () => {
      const res = await AxiosInstance.get("/auth/session");

      if (!token && res.data) {
        AxiosInstance.get("/auth/token")
          .then((res) => {
            const { access_token } = res.data;
            setToken(access_token);
          })
          .catch(() => {
            cancelLoading();
          });
      } else if (token) {
        AxiosInstance.get("/auth/profile").then((res) => {
          setUser(res.data);
          cancelLoading();
        });
      }

      if (!res.data) {
        cancelLoading();
      }
    };

    handleUserApi();
  }, [token]);

  useLayoutEffect(() => {
    const AuthInterceptor = AxiosInstance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          const originalRequest = error.response.config;

          const waitToken = await AxiosInstance.post("/auth/refresh_token");
          const { access_token } = waitToken.data;

          if (!originalRequest._retry && access_token) {
            originalRequest._retry = true;

            // Modify the original request (e.g., refreshing the token)
            originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
            setToken(access_token);
            // Return the modified request
            return AxiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AxiosInstance.interceptors.request.eject(AuthInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    if (token) {
      AxiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      AxiosInstance.defaults.headers.Authorization = ``;
    }
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to={user ? "/" : "/auth/signin"} replace />,
    },
    user
      ? {
          path: "/",
          element: <Layout navBar />,
          children: [
            {
              path: "/",
              element: <HomeIndex />,
              index: true,
            },
            {
              path: "/testing",
              element: <HomeIndex />,
            },
            {
              path: "/explore",
              element: <HomeIndex />,
            },
            {
              path: "/reels",
              element: <HomeIndex />,
              index: true,
            },
            {
              path: "/messages",
              element: <HomeIndex />,
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
    <AuthProivder.Provider
      value={{ user, setUser, isLoading, setLoading, token, setToken }}
    >
      <RouterProvider router={router} />
    </AuthProivder.Provider>
  );
};

export default App;
