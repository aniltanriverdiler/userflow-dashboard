import { Card, Col, Container, Row } from "react-bootstrap";
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

function UsersPage() {
  const users = useLoaderData() as User[];

  return (
    <Container>
      <h1 className="mb-4">Kullanıcılar</h1>
      <Row>
        {users.map((user) => (
          <Col key={user.id} md={4} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  @{user.username}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Phone:</strong> {user.phone} <br />
                  <strong>Company:</strong> {user.company.name} <br />
                  <strong>Address:</strong> {user.address.city} <br />
                </Card.Text>
              </Card.Body>
              <div className="d-flex justify-content-center mb-3">
              <Link
                to={`/users/${user.id}`}
                className="btn btn-outline-primary btn-sm col-3"
              >
                View Details
              </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default UsersPage;
