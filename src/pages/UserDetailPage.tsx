import { Button, Card, CardBody, Container } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

function UserDetailPage() {
  const user = useLoaderData() as User;

  return (
    <Container className="my-4">
      <Card>
        <Card.Header as="h3">{user.name}</Card.Header>
        <Card.Body>
          <Card.Title>@{user.username}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email} <br />
            <strong>Phone:</strong> {user.phone} <br />
            <strong>Website:</strong> <br />
            <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <br />
            <strong>Company:</strong> {user.company.name}
            <br />
            <strong>Address:</strong>{" "}
            {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          </Card.Text>
          <Link to="/users">
            <Button variant="primary">Geri Dön</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDetailPage;
