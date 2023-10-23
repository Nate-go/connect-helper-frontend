import { createBrowserRouter, redirect } from "react-router-dom";

import { MainLayout, PublicLayout } from "@/layouts";
import AuthenticatedRoute from './AuthenticatedRoute'
import PublicRoute from './PublicRoute'

const isAuthenticated = false; //handle check authen later

const currentPath = () => {
  return window.location.pathname;
};

const isUnauthenPath = () => {
  const unauthenPath = ['/login', '/signup']
  return unauthenPath.includes(currentPath());
};

const publicLoader = () => {
  console.log();
  if (isAuthenticated && isUnauthenPath()) {
    return redirect("/home");
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
    loader: publicLoader,
    children: [
        ...PublicRoute
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not found</div>,
    loader: protectedLoader,
    children: [
        ...AuthenticatedRoute
    ],
  },
]);

export default router;
