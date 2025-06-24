import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

interface Album {
  id: number;
  title: string;
  userId: number;
}

function DraggableAlbumsPage() {
  const { userId } = useParams();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);

      //localStorage control
      const saved = localStorage.getItem(`user_${userId}_albums`);
      if (saved) {
        setAlbums(JSON.parse(saved));
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      const data = await response.json();
      setAlbums(data);
      setLoading(false);
    };

    fetchAlbums();
  }, [userId]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...albums];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setAlbums(reordered);
  };

  const handleSave = () => {
    localStorage.setItem(`user_${userId}_albums`, JSON.stringify(albums));
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="px-5 m-5">
      <h2 className="text-center mb-4">Reorder Albums</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="albums">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex flex-column gap-3"
            >
              <Row xs={1} className="g-3">
                {albums.map((album, index) => (
                  <Draggable
                    key={album.id.toString()}
                    draggableId={album.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Col
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card>
                          <Card.Body>
                            <Card.Title>{album.title}</Card.Title>
                            <Card.Text>
                              <strong>User ID:</strong> {album.userId}
                              <br />
                              <strong>Album ID:</strong> {album.id}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Draggable>
                ))}
              </Row>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="text-center">
        <Button variant="success" className="mt-4" onClick={handleSave}>
          Save Order
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Album order has been saved successfully! (Note: Changes are not
          permanent as this is a demo.)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DraggableAlbumsPage;
