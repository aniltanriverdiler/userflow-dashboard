import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

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
    alert("Post sıralaması kaydedildi!");
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Edit Posts</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="posts">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Row xs={1} md={2} lg={3} className="g-3">
                {posts.map((post, index) => (
                  <Draggable
                    key={post.id.toString()}
                    draggableId={post.id.toString()}
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
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                              <strong>User ID:</strong> {post.userId}
                              <br />
                              <strong>Post ID:</strong> {post.id}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Draggable>
                ))}
              </Row>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="text-center">
        <Button variant="success" className="mt-4" onClick={handleSave}>
          Değişiklikleri Kaydet
        </Button>
      </div>
    </Container>
  );
}

export default DraggablePostsPage;
