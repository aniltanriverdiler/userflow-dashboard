import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container className="my-5">
      <header className="text-center mb-5">
        <h1>UserFlow Dashboard</h1>
        <p className="lead">
          Manage users, posts, albums and your favorites with ease.
        </p>
      </header>

      {/* Description Cards */}
      <Row className="mb-5">
        <Col md={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <h4>👤 Users</h4>
              <p>Explore user profiles, their posts, albums and todos.</p>
              <Link to="/users">
                <Button variant="primary" size="sm">
                  View Users
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <h4>📷 Albums</h4>
              <p>Browse through photo albums and mark your favorites.</p>
              <Link to="/favorites/photos">
                <Button variant="success" size="sm">
                  View Albums
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <h4>❤️ Favorites</h4>
              <p>Access your favorite posts and photos anytime.</p>
              <Link to="/favorites/posts">
                <Button variant="danger" size="sm">
                  View Favorites
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
