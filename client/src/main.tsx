import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeIndex from "./pages/home-index";
import Layout from "./components/shared/layout";
import ErrorPage from "./pages/error-page";
import AuthSignInPage from "./pages/auth-signin";
import ProtecedRoute from "./utils/protected-route";
import AuthSignUpPage from "./pages/auth-signup";
import App from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtecedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout navBar />,
        children: [
          {
            path: "/",
            element: <HomeIndex />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/auth/signin",
            element: <AuthSignInPage />,
          },
          {
            path: "/auth/signup",
            element: <AuthSignUpPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
