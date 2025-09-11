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
import DraggableAlbumsPage from "../pages/DraggableAlbumsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div style={{ padding: 24 }}>
        <h2 style={{ fontWeight: 800, marginBottom: 12 }}>
          Something went wrong
        </h2>
        <p>Please go back to the homepage or try again.</p>
        <a href="/" style={{ textDecoration: "underline" }}>
          Go Home
        </a>
      </div>
    ),
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
        path: "users/:userId/draggable-albums",
        element: <DraggableAlbumsPage />,
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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
