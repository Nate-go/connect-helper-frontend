import { createBrowserRouter, redirect } from "react-router-dom";

import { MainLayout } from "@/layouts";
import { Home } from "@pages/home";
import { Login } from "@pages/authentication";

const isAuthenticated = false; //handle check authen later
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

// const userRoutes = [
//   {
//     path: "users",
//     element: <UserList />,
//   },
//   {
//     path: "users/:id",
//     element: <UserDetail />,
//   },
// ];

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
        path: "home",
        element: <Home />,
      },
      // ...userRoutes
    ],
  },
]);

export default router;
