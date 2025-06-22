import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import { usersLoader } from "./usersLoader";
import UserDetailPage from "../pages/UserDetailPage";
import { userDetailLoader } from "./userDetailLoader";
import PostDetailPage from "../pages/PostDetailPage";
import { postDetailLoader } from "./postDetailLoader";

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
  {
    path: "/users/:userId/posts/:postId",
    element: <PostDetailPage />,
    loader: postDetailLoader,
  },
]);
