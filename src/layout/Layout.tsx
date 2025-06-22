import React from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  const favoriteCount = useFavoritesStore((state) => state.photos.length);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/users">
            JSON UI
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/users">
              Kullanıcılar
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favoriler{" "}
              <Badge bg="danger" pill>
                {favoriteCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
