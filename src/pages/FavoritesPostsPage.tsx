import { Card } from "@/components/ui/card";
import { useFavoritesStore } from "../store/favoritesStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function FavoritesPostsPage() {
  const posts = useFavoritesStore((state) => state.posts);
  const removePost = useFavoritesStore((state) => state.removePost);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Favorite Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">You haven't saved any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 space-y-3">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.body}</p>
              <div className="flex justify-between gap-2">
                <Link to={`/users/${post.userId}`}>
                  <Button size="sm">View Profile</Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removePost(post.id)}
                >
                  ♥ Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPostsPage;
