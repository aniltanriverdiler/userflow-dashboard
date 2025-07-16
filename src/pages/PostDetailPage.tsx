import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLoaderData } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

function PostDetailPage() {
  const { post, comments, user } = useLoaderData() as {
    post: Post;
    comments: Comment[];
    user: User;
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Post Card */}
      <Card className="p-4 space-y-2">
        <h4 className="text-xl font-semibold">{post.title}</h4>
        <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
        <p className="text-sm text-muted-foreground">
          <strong>Author:</strong>{" "}
          <Link to={`/users/${user.id}`} className="underline">
            {user.name}
          </Link>
        </p>
      </Card>

      {/* Comment Section */}
      <div>
        <h5 className="text-lg font-medium mb-4">Comment</h5>
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-4">
              <h6 className="text-md font-semibold">{comment.name}</h6>
              <p className="text-sm text-gray-500 mb-1">{comment.email}</p>
              <p className="text-sm">{comment.body}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Return Button */}
      <div>
        <Link to={`/users/${user.id}`}>
          <Button variant="secondary">← Return to User Profile</Button>
        </Link>
      </div>
    </div>
  );
}

export default PostDetailPage;
