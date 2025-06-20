import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import { usersLoader } from "./usersLoader";
import UserDetailPage from "../pages/UserDetailPage";
import { userDetailLoader } from "./userDetailLoader";

export const router = createBrowserRouter([
  {
    path: "/users",
    element: <UsersPage />,
    loader: usersLoader,
  },
  {
    path: "/users/:userId",
    element: <UserDetailPage />,
    loader: userDetailLoader,
  },
]);
