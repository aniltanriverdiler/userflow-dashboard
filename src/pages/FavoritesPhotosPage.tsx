import { useFavoritesStore } from "../store/favoritesStore";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function FavoritesPhotosPage() {
  const photos = useFavoritesStore((state) => state.photos);
  const removePhoto = useFavoritesStore((state) => state.removePhoto);

  return (
    <Container className="my-4">
      <h2>Favorite Photos</h2>

      {photos.length === 0 ? (
        <p>You don’t have any favorite photos yet.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {photos.map((photo) => (
            <Col key={photo.id}>
              <Card>
                <Card.Img variant="top" src={photo.thumbnailUrl} />
                <CardBody>
                  <CardText>{photo.title}</CardText>
                  <div className="d-flex justify-content-between">
                    <Link to={`/users/${photo.userId}/albums/${photo.albumId}`}>
                      <Button variant="primary" size="sm">
                        Go to Album
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removePhoto(photo.id)}
                    >
                      ♥ Remove
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesPhotosPage;
