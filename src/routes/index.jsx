import { createBrowserRouter, redirect } from "react-router-dom";

import { MainLayout } from "@/layouts";
import { Home } from "@pages/home";
import { Login } from "@pages/authentication";
import { userRoutes } from "./protectedRoutes";

const isAuthenticated = true; //handle check authen later
const publicLoader = () => {
  if (isAuthenticated) {
    return redirect("/");
  }
  return null;
};

const protectedLoader = () => {
  if (!isAuthenticated) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: publicLoader,
  },
  {
    path: "/register",
    element: <Login />,
    loader: publicLoader,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not found</div>,
    loader: protectedLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      ...userRoutes,
    ],
  },
]);

export default router;
