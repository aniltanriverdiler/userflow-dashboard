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
  userId: number;
  albumId: number;
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

  const currentUserId = Number(localStorage.getItem("current_user_id"));

  const favoritePhotos =
    useFavoritesStore((state) => state.favoritesByUser[currentUserId]) || [];

  const addPhoto = useFavoritesStore((state) => state.addPhoto);
  const removePhoto = useFavoritesStore((state) => state.removePhoto);

  const isPhotoFavorite = (photoId: number) => {
    return favoritePhotos.some((p) => p.id === photoId);
  };

  const isCheckUser = (uid: number) => {
    return favoritePhotos.some((p) => p.userId === uid);
  };

  return (
    <Container className="my-4">
      <Card className="mb-4">
        <CardHeader as="h4" className="text-truncate">
          {album.title}
        </CardHeader>
        <CardBody>
          <CardText>
            <strong>Owner:</strong>{" "}
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </CardText>
        </CardBody>
      </Card>

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {photos.map((photo) => {
          const isFav = isPhotoFavorite(photo.id);
          const isCurrentAccount = isCheckUser(photo.userId);
          const toggleFavorite = () => {
            if (isFav) {
              removePhoto(photo.id, currentUserId);
            } else {
              addPhoto(photo, currentUserId);
            }
          };

          return (
            <Col key={photo.id}>
              <Card>
                <Card.Img variant="top" src={photo.thumbnailUrl} />
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Text
                    className="me-2 text-truncate"
                    title={photo.title}
                    style={{ maxWidth: "150px" }}
                  >
                    {photo.title}
                  </Card.Text>
                  <Button
                    variant="link"
                    onClick={toggleFavorite}
                    style={{
                      color: isFav && isCurrentAccount ? "red" : "gray",
                      fontSize: "1.5rem",
                    }}
                  >
                    {isFav && isCurrentAccount ? "♥" : "♡"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div className="mt-4">
        <Link to={`/users/${user.id}`}>
          <Button variant="secondary">← Return to User Profile</Button>
        </Link>
      </div>
    </Container>
  );
}

export default AlbumDetailPage;
