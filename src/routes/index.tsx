import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import { usersLoader } from "./usersLoader";

export const router = createBrowserRouter([
  {
    path: "/users",
    element: <UsersPage />,
    loader: usersLoader,
  },
]);
