import { Button, Card, Container } from "react-bootstrap";
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
    <Container className="my-4">
      <Card className="mb-4">
        <Card.Header as="h4">{post.title}</Card.Header>
        <Card.Body>
          <Card.Text>{post.body}</Card.Text>
          <Card.Text>
            <strong>Author:</strong>{" "}
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </Card.Text>
        </Card.Body>
      </Card>

      <h5>Comments</h5>
      <div className="d-flex flex-column gap-3">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <Card.Body>
              <Card.Title>{comment.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.email}
              </Card.Subtitle>
              <Card.Text>{comment.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="mt-4">
        <Link to={`/users/${user.id}`}>
          <Button variant="secondary">← Return to User Profile</Button>
        </Link>
      </div>
    </Container>
  );
}

export default PostDetailPage;
