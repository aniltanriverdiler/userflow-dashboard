import { useFavoritesStore } from "../store/favoritesStore";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

function AppNavbar() {
  const [currentUserId, setCurrentUserId] = useState<number>(() =>
    Number(localStorage.getItem("current_user_id"))
  );

  useEffect(() => {
    const handleStorage = () => {
      setCurrentUserId(Number(localStorage.getItem("current_user_id")));
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("current_user_id_change", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("current_user_id_change", handleStorage);
    };
  }, []);

  const photoCount = useFavoritesStore(
    (state) => state.favoritesByUser[currentUserId]?.length || 0
  );
  const postCount = useFavoritesStore((state) => state.posts.length);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <NavLink
            to="/"
            className="text-xl font-semibold hover:opacity-80 transition"
          >
            UserFlow Dashboard
          </NavLink>

          <div className="flex gap-6 text-sm items-center">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `hover:underline transition ${
                  isActive ? "font-semibold underline" : ""
                }`
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/favorites/photos"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:underline transition ${
                  isActive ? "font-semibold underline" : ""
                }`
              }
            >
              Favorites - Albums
              <Badge variant="secondary">{photoCount}</Badge>
            </NavLink>

            <NavLink
              to="/favorites/posts"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:underline transition ${
                  isActive ? "font-semibold underline" : ""
                }`
              }
            >
              Favorites - Posts
              <Badge variant="secondary">{postCount}</Badge>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </>
  );
}

export default AppNavbar;
