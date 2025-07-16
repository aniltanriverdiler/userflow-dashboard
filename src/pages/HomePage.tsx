import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="container mx-auto my-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">UserFlow Dashboard</h1>
        <p className="text-lg text-gray-600">
          Manage users, posts, albums and your favorites with ease.
        </p>
      </header>

      {/* Description Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 text-center space-y-4">
          <h4 className="text-xl font-semibold">👤 Users</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Explore user profiles, their posts, albums and todos.
          </p>
          <Link to="/users">
            <Button variant="default" size="sm">
              View Users
            </Button>
          </Link>
        </div>

        {/* Albums */}
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 text-center space-y-4">
          <h4 className="text-xl font-semibold">📷 Albums</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Browse through photo albums and mark your favorites.
          </p>
          <Link to="/favorites/photos">
            <Button variant="secondary" size="sm">
              View Albums
            </Button>
          </Link>
        </div>

        {/* Favorites  */}
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 text-center space-y-4">
          <h4 className="text-xl font-semibold">❤️ Favorites</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Access your favorite posts and photos anytime.
          </p>
          <Link to="/favorites/posts">
            <Button variant="destructive" size="sm">
              View Favorites
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
