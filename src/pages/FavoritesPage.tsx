// src/pages/FavoritesPage.tsx
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

function FavoritesPage() {
  const posts = useFavoritesStore((state) => state.posts);
  const removePost = useFavoritesStore((state) => state.removePost);
  const photos = useFavoritesStore((state) => state.photos);
  const removePhoto = useFavoritesStore((state) => state.removePhoto);

  return (
    <Container className="my-4">
      {/* FAV Photos */}
      <h2>Favori Fotoğraflar</h2>

      {photos.length === 0 ? (
        <p>Henüz favorilere eklenmiş bir fotoğraf yok.</p>
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
                        Albümüne Git
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removePhoto(photo.id)}
                    >
                      ♥ Kaldır
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* FAV Posts */}
      <h2 className="mt-5">Favori Postlar</h2>

      {useFavoritesStore.getState().posts.length === 0 ? (
        <p>Henüz favorilere eklenmiş bir post yok.</p>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {posts.map((post) => (
            <Col key={post.id}>
              <Card>
                <CardBody>
                  <Card.Title>{post.title}</Card.Title>
                  <CardText>{post.body}</CardText>
                  <div className="d-flex justify-content-between">
                    <Link to={`/users/${post.userId}`}>
                      <Button variant="primary" size="sm">
                        Kullanıcıya Git
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removePost(post.id)}
                    >
                      ♥ Kaldır
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

export default FavoritesPage;
