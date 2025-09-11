import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLoaderData } from "react-router-dom";
import type { ApiPost, ApiComment, ApiUser } from "../types/types";

function PostDetailPage() {
  const { post, comments, user } = useLoaderData() as {
    post: ApiPost;
    comments: ApiComment[];
    user: ApiUser;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 space-y-10">
      {/* Post Card */}
      <Card className="p-8 space-y-4 bg-card rounded-2xl shadow-lg border border-border">
        <h4 className="text-3xl font-extrabold text-primary flex items-center gap-2 mb-2">
          📝 {post.title}
        </h4>
        <p className="text-lg text-foreground font-medium mb-2">{post.body}</p>
        <p className="text-base text-accent">
          <strong>Author:</strong>{" "}
          <Link
            to={`/users/${user.id}`}
            className="underline hover:text-primary transition"
          >
            {user.name}
          </Link>
        </p>
      </Card>

      {/* Comment Section */}
      <div>
        <h5 className="text-2xl font-bold mb-6 text-primary">💬 Comments</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="p-6 rounded-xl shadow border border-border bg-card group transition-transform hover:scale-[1.03] hover:shadow-lg"
            >
              <h6 className="text-lg font-semibold text-primary flex items-center gap-2 mb-1">
                🗨️ {comment.name}
              </h6>
              <p className="text-sm text-muted-foreground mb-1">
                {comment.email}
              </p>
              <p className="text-base text-foreground">{comment.body}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Return Button */}
      <div className="flex justify-center mt-8">
        <Link to={`/users/${user.id}`}>
          <Button
            variant="outline"
            className="font-bold px-8 py-3 text-lg rounded-xl"
          >
            ← Return to User Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PostDetailPage;
