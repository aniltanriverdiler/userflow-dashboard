import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const photoCount = useFavoritesStore(
    (state) => state.getPhotosByUser(user?.id || "").length
  );
  const postCount = useFavoritesStore(
    (state) => state.getPostsByUser(user?.id || "").length
  );

  const handleLogout = () => {
    logout();
    // Reset the current user ID for the demo data
    localStorage.setItem("current_user_id", "1");
    window.dispatchEvent(new Event("current_user_id_change"));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-primary/95 shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-2 sm:px-4 py-2 min-h-[60px]">
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:text-muted-foreground transition-colors duration-150 ml-4"
          >
            UserFlow Dashboard
          </NavLink>

          <div className="flex gap-1 sm:gap-4 text-base items-center">
            {isAuthenticated ? (
              <>
                {/* Show user name */}
                <span className="text-white/90 font-medium">
                  Welcome,{" "}
                  {user ? `${user.firstName} ${user.lastName}`.trim() : ""}!
                </span>

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
                    <Badge
                      variant="secondary"
                      className="ml-1 bg-secondary/80 text-white font-bold shadow-none border-none"
                    >
                      {photoCount}
                    </Badge>
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
                    <Badge
                      variant="secondary"
                      className="ml-1 bg-secondary/80 text-white font-bold shadow-none border-none"
                    >
                      {postCount}
                    </Badge>
                  </span>
                </NavLink>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="font-bold border-white/20 hover:bg-white/10 hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Show login/register buttons when not authenticated */}
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-bold border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-bold border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
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
