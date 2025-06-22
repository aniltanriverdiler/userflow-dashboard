import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
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
            <strong>Yazar:</strong>{" "}
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </Card.Text>
        </Card.Body>
      </Card>

      <h5>Yorumlar</h5>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroupItem key={comment.id}>
            <strong>{comment.name}</strong> ({comment.email})<br />
            <span>{comment.body}</span>
          </ListGroupItem>
        ))}
      </ListGroup>

      <div className="mt-4">
        <Link to={`/users/${user.id}`}>
          <Button variant="secondary">Kullanıcı Profiline Geri Dön</Button>
        </Link>
      </div>
    </Container>
  );
}

export default PostDetailPage;
