import { useFavoritesStore } from "../store/favoritesStore";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

interface Album {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

function AlbumDetailPage() {
  const { album, photos, user } = useLoaderData() as {
    album: Album;
    photos: Photo[];
    user: User;
  };

  return (
    <Container className="my-4">
      <Card className="mb-4">
        <CardHeader as="h4">{album.title}</CardHeader>
        <CardBody>
          <CardText>
            <strong>Sahibi:</strong>{" "}
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </CardText>
        </CardBody>
      </Card>

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {photos.map((photo) => {
          const isFav = useFavoritesStore((state) =>
            state.isFavorite(photo.id)
          );
          const add = useFavoritesStore((state) => state.addPhoto);
          const remove = useFavoritesStore((state) => state.removePhoto);

          const toggleFavorite = () => {
            if (isFav) {
              remove(photo.id);
            } else {
              add({
                userId: user.id,
                albumId: album.id,
                ...photo,
              });
            }
          };

          return (
            <Col key={photo.id}>
              <Card>
                <Card.Img variant="top" src={photo.thumbnailUrl} />
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Text className="me-2">{photo.title}</Card.Text>
                  <Button
                    variant="link"
                    onClick={toggleFavorite}
                    style={{
                      color: isFav ? "red" : "gray",
                      fontSize: "1.5rem",
                    }}
                  >
                    {isFav ? "♥" : "♡"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div className="mt-4">
        <Link to={`/users/${user.id}`}>
          <Button variant="secondary">← Kullanıcı Profiline Dön</Button>
        </Link>
      </div>
    </Container>
  );
}

export default AlbumDetailPage;
