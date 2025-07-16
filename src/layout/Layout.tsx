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
      <nav className="bg-primary/95 shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-2 sm:px-4 py-2 min-h-[60px]">
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:text-muted-foreground transition-colors duration-150"
          >
            UserFlow Dashboard
          </NavLink>

          <div className="flex gap-1 sm:gap-4 text-base items-center">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `relative px-3 py-1.5 rounded-md font-semibold transition-colors duration-150 hover:bg-secondary/40 hover:text-white ${
                  isActive ? "bg-secondary/80 text-white" : "text-white/90"
                }`
              }
            >
              <span className="inline-flex items-center gap-1">
                <span className="text-lg mb-1">👥</span> Users
              </span>
            </NavLink>

            <NavLink
              to="/favorites/photos"
              className={({ isActive }) =>
                `relative px-3 py-1.5 rounded-md font-semibold transition-colors duration-150 hover:bg-secondary/40 hover:text-white flex items-center gap-1 ${
                  isActive ? "bg-secondary/80 text-white" : "text-white/90"
                }`
              }
            >
              <span className="inline-flex items-center gap-1">
                <span className="text-lg mb-1.5">📷</span> Fav Albums
                <Badge variant="secondary" className="ml-1 bg-secondary/80 text-white font-bold shadow-none border-none">{photoCount}</Badge>
              </span>
            </NavLink>

            <NavLink
              to="/favorites/posts"
              className={({ isActive }) =>
                `relative px-3 py-1.5 rounded-md font-semibold transition-colors duration-150 hover:bg-secondary/40 hover:text-white flex items-center gap-1 ${
                  isActive ? "bg-secondary/80 text-white" : "text-white/90"
                }`
              }
            >
              <span className="inline-flex items-center gap-1">
                <span className="text-lg">★</span> Fav Posts
                <Badge variant="secondary" className="ml-1 bg-secondary/80 text-white font-bold shadow-none border-none">{postCount}</Badge>
              </span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="container mx-auto px-2 sm:px-4 py-6 min-h-[calc(100vh-60px)] transition-all">
        <Outlet />
      </div>
    </>
  );
}

export default AppNavbar;
