import { useEffect, useState } from "react";
import { useFavoritesStore, type Photo } from "../store/favoritesStore";
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
  const currentUserId = Number(localStorage.getItem("current_user_id"));
  const rawFavByUser = useFavoritesStore((state)=>state.favoritesByUser)
  const [photos,setPhotos]=useState<Photo[]>([]);


  useEffect(()=>{
    setPhotos(rawFavByUser[currentUserId] || [])
  },[rawFavByUser,currentUserId])

  
  if (!currentUserId) {
    return (
      <Container className="my-4">
        <p>No user selected. Please log in or choose a user.</p>
      </Container>
    );
  }

  // const getPhotosByUser = useFavoritesStore((state) => state.getPhotosByUser);
  const removePhoto = useFavoritesStore((state) => state.removePhoto);

  const hasHydrated = useFavoritesStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return (
      <Container className="my-4">
        <p>Loading favorites...</p>
      </Container>
    );
  }

  // const photos = useFavoritesStore((state) =>
  //   state.favoritesByUser[currentUserId] || [] 
  // );

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
                  <CardText className="text-truncate" title={photo.title}>
                    {photo.title}
                  </CardText>
                  <div className="d-flex justify-content-between">
                    <Link to={`/users/${photo.userId}/albums/${photo.albumId}`}>
                      <Button variant="primary" size="sm">
                        Go to Album
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removePhoto(photo.id, currentUserId)}
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
