import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface Post {
  id: number;
  title: string;
  userId: number;
}

interface Album {
  id: number;
  title: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function UserDetailPage() {
  const user = useLoaderData() as User;
  const favoritePosts = useFavoritesStore((state) => state.posts);
  const addPost = useFavoritesStore((state) => state.addPost);
  const removePost = useFavoritesStore((state) => state.removePost);
  const [activeTab, setActiveTab] = useState("posts");
  const [tabData, setTabData] = useState<(Post | Album | Todo)[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (key: string) => {
    if (key === "edit-posts") navigate(`/users/${user.id}/draggable-posts`);
    else if (key === "edit-albums")
      navigate(`/users/${user.id}/draggable-albums`);
    else setActiveTab(key);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      setLoading(true);

      const urls = {
        posts: `https://jsonplaceholder.typicode.com/users/${user.id}/posts`,
        albums: `https://jsonplaceholder.typicode.com/users/${user.id}/albums`,
        todos: `https://jsonplaceholder.typicode.com/users/${user.id}/todos`,
      };

      const res = await fetch(urls[activeTab as keyof typeof urls]);
      const data = await res.json();
      setTabData(data);
      setLoading(false);
    };

    fetchData();
  }, [activeTab, user]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("current_user_id", String(user.id));
      window.dispatchEvent(new Event("current_user_id_change"));
    }
  }, [user?.id]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <Card className="p-5 space-y-3">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">@{user.username}</p>
        <div className="text-sm space-y-1">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`http://${user.website}`}
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          </p>
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          </p>
        </div>
        <Link to="/users">
          <Button>← Go Back</Button>
        </Link>
      </Card>

      <Tabs value={activeTab} onValueChange={handleSelect} className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="edit-posts">Edit Posts</TabsTrigger>
          <TabsTrigger value="edit-albums">Edit Albums</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {loading ? (
            <p className="text-center my-4">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {tabData
                .filter(
                  (item): item is Post => "title" in item && "userId" in item
                )
                .map((post) => {
                  const isFav = favoritePosts.some((p) => p.id === post.id);
                  const toggle = () => {
                    if (isFav) removePost(post.id);
                    else
                      addPost({
                        ...post,
                        body: post.body ?? "",
                        userId: user.id,
                      });
                  };

                  return (
                    <Card key={post.id} className="p-4 space-y-2 h-full">
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm">Post ID: {post.id}</p>
                      <div className="flex justify-between items-center">
                        <Link to={`/users/${post.userId}/posts/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Comment Details
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggle}
                          className={isFav ? "text-red-500" : "text-gray-400"}
                        >
                          {isFav ? "♥" : "♡"}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="albums">
          {loading ? (
            <p className="text-center my-4">Loading...</p>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {tabData
                .filter(
                  (item): item is Album =>
                    "title" in item && !("completed" in item)
                )
                .map((album) => (
                  <Card key={album.id} className="p-4">
                    <h4 className="font-semibold">{album.title}</h4>
                    <p className="text-sm">Album ID: {album.id}</p>
                    <Link to={`/users/${user.id}/albums/${album.id}`}>
                      <Button size="sm">Album Details</Button>
                    </Link>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="todos">
          {loading ? (
            <p className="text-center my-4">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {tabData
                .filter((item): item is Todo => "completed" in item)
                .map((todo) => (
                  <Card
                    key={todo.id}
                    className={`p-4 border-l-4 ${
                      todo.completed ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <h5 className="font-medium">{todo.title}</h5>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={
                          todo.completed ? "text-green-600" : "text-red-600"
                        }
                      >
                        {todo.completed ? "Completed ✅" : "Incomplete ❌"}
                      </span>
                    </p>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserDetailPage;
