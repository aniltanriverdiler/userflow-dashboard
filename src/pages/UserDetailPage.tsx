import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

function UserDetailPage() {
  const favoritePosts = useFavoritesStore((state) => state.posts);
  const addPost = useFavoritesStore((state) => state.addPost);
  const removePost = useFavoritesStore((state) => state.removePost);

  const user = useLoaderData() as User;

  const [activeTab, setActiveTab] = useState("posts");
  const [tabData, setTabData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      setLoading(true);
      let url = "";

      switch (activeTab) {
        case "posts":
          url = `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
          break;
        case "albums":
          url = `https://jsonplaceholder.typicode.com/users/${user.id}/albums`;
          break;
        case "todos":
          url = `https://jsonplaceholder.typicode.com/users/${user.id}/todos`;
          break;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTabData(data);
      setLoading(false);
    };

    fetchData();
  }, [activeTab, user]);

  return (
    <Container className="my-4">
      <Card>
        <Card.Header as="h3">{user.name}</Card.Header>
        <Card.Body>
          <Card.Title>@{user.username}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email} <br />
            <strong>Phone:</strong> {user.phone} <br />
            <strong>Website:</strong> <br />
            <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <br />
            <strong>Company:</strong> {user.company.name}
            <br />
            <strong>Address:</strong>{" "}
            {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          </Card.Text>
          <Link to="/users">
            <Button variant="primary">Geri Dön</Button>
          </Link>
        </Card.Body>
        <Tabs
          defaultActiveKey="posts"
          id="user-tabs"
          className="mt-4"
          onSelect={(key) => setActiveTab(key as string)}
        >
          <Tab eventKey="posts" title="Posts">
            {loading && <Spinner animation="border" variant="primary" />}
            {!loading && (
              <ul className="list-unstyled">
                {tabData.map((post: any) => {
                  const isFav = favoritePosts.some((p) => p.id === post.id);

                  const toggle = () => {
                    if (isFav) {
                      removePost(post.id);
                    } else {
                      addPost({ ...post, userId: user.id });
                    }
                  };

                  return (
                    <li
                      key={post.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <span>{post.title}</span>
                      <Button
                        variant="link"
                        onClick={toggle}
                        style={{
                          color: isFav ? "red" : "gray",
                          fontSize: "1.3rem",
                        }}
                      >
                        {isFav ? "♥" : "♡"}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Tab>

          <Tab eventKey="albums" title="Albums">
            {loading && <Spinner animation="border" variant="success" />}
            {!loading && (
              <ul>
                {tabData.map((album: any) => (
                  <li key={album.id}>{album.title}</li>
                ))}
              </ul>
            )}
          </Tab>

          <Tab eventKey="todos" title="Todos">
            {loading && <Spinner animation="border" variant="warning" />}
            {!loading && (
              <ul>
                {tabData.map((todo: any) => (
                  <li key={todo.id}>
                    {todo.title} {todo.completed ? "✅" : "❌"}
                  </li>
                ))}
              </ul>
            )}
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
}

export default UserDetailPage;
