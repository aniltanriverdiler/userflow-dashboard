import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
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
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  @{user.username}
                </Card.Subtitle>
                <Card.Text>{user.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default UsersPage;
