import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Drag & Drop to Reorder Posts
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="posts">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
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
                      className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4"
                    >
                      <h4 className="text-lg font-medium mb-1">{post.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>User ID:</strong> {post.userId} <br />
                        <strong>Post ID:</strong> {post.id}
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Save & Back Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <Button variant="default" onClick={handleSave}>
          Save Changes
        </Button>

        <Link to={`/users/${userId}`}>
          <Button variant="secondary">← Return to User Profile</Button>
        </Link>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Post order has been saved successfully! (Note: Changes are not
            permanent as this is a demo.)
          </p>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DraggablePostsPage;
