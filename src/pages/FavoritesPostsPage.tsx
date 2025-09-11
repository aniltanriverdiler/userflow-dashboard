import { Card } from "@/components/ui/card";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ApiPost } from "../types/types";

function FavoritesPostsPage() {
  const { user } = useAuthStore();
  const userKey = user?.id || "";
  const postsFromStore = useFavoritesStore((state) => state.postsByUser[userKey]);
  const posts: ApiPost[] = postsFromStore ?? [];
  const removePost = useFavoritesStore((state) => state.removePost);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-primary tracking-tight">
        Favorite Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center">You haven't saved any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-5 flex flex-col h-full rounded-xl shadow border border-border bg-card group transition-transform hover:scale-[1.03] hover:shadow-lg">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2">📝 {post.title}</h3>
              <p className="text-sm text-foreground mb-4 flex-1">{post.body}</p>
              <div className="flex justify-between gap-6 mt-auto">
                <Link to={`/users/${post.userId}`} className="w-1/2">
                  <Button size="sm" className="w-full font-semibold" variant="outline">
                    👤 View Profile
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removePost(post.id, user?.id || "")}
                  className="w-1/2 font-semibold text-lg text-accent hover:scale-105 transition-all"
                  aria-label="Remove from favorites"
                >
                  ★ Remove
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
