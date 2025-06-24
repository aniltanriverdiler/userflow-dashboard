import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import { usersLoader } from "./usersLoader";
import UserDetailPage from "../pages/UserDetailPage";
import { userDetailLoader } from "./userDetailLoader";
import PostDetailPage from "../pages/PostDetailPage";
import { postDetailLoader } from "./postDetailLoader";
import AlbumDetailPage from "../pages/AlbumDetailPage";
import { albumDetailLoader } from "./albumDetailLoader";
import Layout from "../layout/Layout";
import FavoritesPhotosPage from "../pages/FavoritesPhotosPage";
import FavoritesPostsPage from "../pages/FavoritesPostsPage";
import HomePage from "../pages/HomePage";
import DraggablePostsPage from "../pages/DraggablePostsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
        loader: usersLoader,
      },
      {
        path: "users/:userId",
        element: <UserDetailPage />,
        loader: userDetailLoader,
      },
      {
        path: "users/:userId/posts/:postId",
        element: <PostDetailPage />,
        loader: postDetailLoader,
      },
      {
        path: "users/:userId/albums/:albumId",
        element: <AlbumDetailPage />,
        loader: albumDetailLoader,
      },
      {
        path: "users/:userId/draggable-posts",
        element: <DraggablePostsPage />,
      },
      {
        path: "/favorites/photos",
        element: <FavoritesPhotosPage />,
      },
      {
        path: "/favorites/posts",
        element: <FavoritesPostsPage />,
      },
    ],
  },
]);
