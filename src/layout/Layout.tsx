import { useFavoritesStore } from "../store/favoritesStore";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function AppNavbar() {
  const [currentUserId, setCurrentUserId] = useState<number>(() => Number(localStorage.getItem("current_user_id")));

  useEffect(() => {
    const handleStorage = () => {
      setCurrentUserId(Number(localStorage.getItem("current_user_id")));
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("current_user_id_change", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("current_user_id_change", handleStorage);
    };
  }, []);

  const photoCount = useFavoritesStore(
    (state) => state.favoritesByUser[currentUserId]?.length || 0
  );

  const postCount = useFavoritesStore((state) => state.posts.length);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="ms-3" as={NavLink} to="/">
            UserFlow Dashboard
          </Navbar.Brand>

          <Nav className="ms-auto gap-4">
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>

            <Nav.Link as={NavLink} to="/favorites/photos">
              Favorites - Albums{" "}
              <Badge bg="light" text="dark">
                {photoCount}
              </Badge>
            </Nav.Link>

            <Nav.Link as={NavLink} to="/favorites/posts">
              Favorites - Posts{" "}
              <Badge bg="light" text="dark">
                {postCount}
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

export default AppNavbar;
