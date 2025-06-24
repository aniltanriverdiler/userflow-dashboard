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

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function DraggablePostsPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem(`user_${userId}_posts`);
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [userId]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newPosts = Array.from(posts);
    const [movedPost] = newPosts.splice(result.source.index, 1);
    newPosts.splice(result.destination.index, 0, movedPost);
    setPosts(newPosts);
  };

  const handleSave = () => {
    localStorage.setItem(`user_${userId}_posts`, JSON.stringify(posts));
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
      <h2 className="text-center mb-4">Drag & Drop to Reorder Posts</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="posts">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex flex-column gap-3"
            >
              {posts.map((post, index) => (
                <Draggable
                  key={post.id.toString()}
                  draggableId={post.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card>
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>
                            <strong>User ID:</strong> {post.userId}
                            <br />
                            <strong>Post ID:</strong> {post.id}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="text-center">
        <Button variant="success" className="mt-4" onClick={handleSave}>
          Değişiklikleri Kaydet
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Post order has been saved successfully! (Note: Changes are not
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

export default DraggablePostsPage;
