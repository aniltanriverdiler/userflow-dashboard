import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Post as PostType } from "../store/favoritesStore";

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
      let data = await res.json();
      if (activeTab === 'posts') {
        data = data.map((post: { id: number; title: string; userId: number; body?: string }) => ({ ...post, body: typeof post.body === 'string' ? post.body : '' }));
      }
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
    <div className="container mx-auto px-2 sm:px-4 py-6 space-y-8">
      <Card className="p-7 space-y-4 bg-card rounded-2xl shadow-lg border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow border-4 border-background bg-primary/90`}>
              {user.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-primary mb-1">{user.name}</h2>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted text-primary shadow-none">
                @{user.username}
              </span>
            </div>
          </div>
          <Link to="/users">
            <Button variant="outline" className="font-bold">
              ← Go Back
            </Button>
          </Link>
        </div>
        <div className="text-sm space-y-1 mt-4">
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
              className="underline text-accent hover:text-primary transition"
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          </p>
          <p>
            <strong>Company:</strong> <span className="font-semibold text-accent">{user.company.name}</span>
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          </p>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={handleSelect} className="w-full">
        <TabsList className="flex justify-center items-center gap-1 bg-muted rounded-xl shadow px-1 py-0.5 mx-auto w-fit">
          <TabsTrigger value="posts" className="flex items-center gap-1 text-sm font-semibold text-primary px-3 py-1.5 rounded-md data-[state=active]:bg-background data-[state=active]:text-accent transition-all">
            📝 Posts
          </TabsTrigger>
          <TabsTrigger value="albums" className="flex items-center gap-1 text-sm font-semibold text-primary px-3 py-1.5 rounded-md data-[state=active]:bg-background data-[state=active]:text-accent transition-all">
            📷 Albums
          </TabsTrigger>
          <TabsTrigger value="todos" className="flex items-center gap-1 text-sm font-semibold text-primary px-3 py-1.5 rounded-md data-[state=active]:bg-background data-[state=active]:text-accent transition-all">
            ✅ Todos
          </TabsTrigger>
          <TabsTrigger value="edit-posts" className="flex items-center gap-1 text-sm font-semibold text-primary px-3 py-1.5 rounded-md data-[state=active]:bg-background data-[state=active]:text-accent transition-all">
            ✏️ Edit Posts
          </TabsTrigger>
          <TabsTrigger value="edit-albums" className="flex items-center gap-1 text-sm font-semibold text-primary px-3 py-1.5 rounded-md data-[state=active]:bg-background data-[state=active]:text-accent transition-all">
            🛠️ Edit Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {loading ? (
            <p className="text-center my-4">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {tabData
                .filter(
                  (item): item is PostType => "title" in item && "userId" in item
                )
                .map((post) => {
                  const typedPost = post as PostType;
                  const isFav = favoritePosts.some((p) => p.id === post.id);
                  const toggle = () => {
                    if (isFav) removePost(post.id);
                    else {
                      addPost({
                        ...typedPost,
                        userId: user.id,
                      });
                    }
                  };

                  return (
                    <Card key={post.id} className="p-5 space-y-2 h-full rounded-xl shadow border border-border bg-card group transition-transform hover:scale-[1.03] hover:shadow-lg">
                      <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
                        📝 {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">Post ID: {post.id}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Link to={`/users/${post.userId}/posts/${post.id}`}>
                          <Button variant="outline" size="sm" className="font-bold">
                            💬 Comment Details
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggle}
                          className={`rounded-full text-2xl transition-all duration-200 ${isFav ? "text-accent scale-125" : "text-muted-foreground hover:text-accent hover:scale-110"}`}
                          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                        >
                          {isFav ? "★" : "☆"}
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
                  <Card key={album.id} className="p-4 rounded-xl shadow border border-border bg-card group transition-transform hover:scale-[1.03] hover:shadow-lg">
                    <h4 className="font-semibold text-accent flex items-center gap-2">📷 {album.title}</h4>
                    <p className="text-xs text-muted-foreground">Album ID: {album.id}</p>
                    <Link to={`/users/${user.id}/albums/${album.id}`}>
                      <Button size="sm" className="font-bold mt-2" variant="outline">
                        📸 Album Details
                      </Button>
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
                    className={`p-4 border-l-4 ${todo.completed ? "border-accent" : "border-secondary"} bg-card shadow border border-border`}
                  >
                    <h5 className="font-medium text-primary">{todo.title}</h5>
                    <p className="text-sm">
                      Status: {" "}
                      <span className={todo.completed ? "text-accent" : "text-secondary"}>
                        {todo.completed ? "Completed" : "Incomplete"}
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
