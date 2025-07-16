import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="container mx-auto my-12 px-2 sm:px-4">
      <header className="text-center mb-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-primary mb-4 tracking-tight">
          UserFlow Dashboard
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
          Manage users, posts, albums and your favorites with ease.
        </p>
      </header>

      {/* Description Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Users */}
        <div className="relative group bg-card shadow-lg rounded-2xl border border-border transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl flex flex-col items-center justify-center min-h-[220px] p-6">
          <div className="absolute top-4 right-4 opacity-20 text-4xl pointer-events-none select-none flex items-center justify-center w-10 h-10">
            <span role="img" aria-label="users">👤</span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            <h4 className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
              Users
            </h4>
            <p className="text-muted-foreground mb-4 text-base font-medium text-center">
              Explore user profiles, their posts, albums and todos.
            </p>
          </div>
          <Link to="/users" className="w-full mt-auto">
            <Button variant="default" size="lg" className="w-full font-bold">
              View Users
            </Button>
          </Link>
        </div>

        {/* Albums */}
        <div className="relative group bg-card shadow-lg rounded-2xl border border-border transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl flex flex-col items-center justify-center min-h-[220px] p-6">
          <div className="absolute top-4 right-4 opacity-20 text-4xl pointer-events-none select-none flex items-center justify-center w-10 h-10">
            <span role="img" aria-label="albums">📷</span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            <h4 className="text-2xl font-bold text-accent flex items-center gap-2 mb-2">
              Albums
            </h4>
            <p className="text-muted-foreground mb-4 text-base font-medium text-center">
              Browse through photo albums and mark your favorites.
            </p>
          </div>
          <Link to="/favorites/photos" className="w-full mt-auto">
            <Button variant="secondary" size="lg" className="w-full font-bold">
              View Albums
            </Button>
          </Link>
        </div>

        {/* Favorites  */}
        <div className="relative group bg-card shadow-lg rounded-2xl border border-border transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl flex flex-col items-center justify-center min-h-[220px] p-6">
          <div className="absolute top-4 right-4 opacity-20 text-4xl pointer-events-none select-none flex items-center justify-center w-10 h-10">
            <span role="img" aria-label="favorites">★</span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            <h4 className="text-2xl font-bold text-secondary flex items-center gap-2 mb-2">
              Favorites
            </h4>
            <p className="text-muted-foreground mb-4 text-base font-medium text-center">
              Access your favorite posts and photos anytime.
            </p>
          </div>
          <Link to="/favorites/posts" className="w-full mt-auto">
            <Button variant="outline" size="lg" className="w-full font-bold">
              View Favorites
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
