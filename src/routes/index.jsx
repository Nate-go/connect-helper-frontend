import { createBrowserRouter, redirect } from "react-router-dom";
import Cookies from "js-cookie";

import { MainLayout, PublicLayout } from "@/layouts";
import AuthenticatedRoute from './AuthenticatedRoute'
import PublicRoute from './PublicRoute'
import { getCurrentPath } from "@/helpers/pathHelper";
import { NotFound } from "@/pages/errors";


const isAuthenticated = Cookies.get('auth');

const isUnauthenPath = () => {
  const unauthenPath = ['/login', '/signup']
  return unauthenPath.includes(getCurrentPath());
};

const publicLoader = () => {
  if (isAuthenticated && isUnauthenPath()) {
    return redirect("/dashboard");
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
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound/>,
    loader: publicLoader,
    children: [
        ...PublicRoute
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    loader: protectedLoader,
    children: [
        ...AuthenticatedRoute
    ],
  },
]);

export default router;
