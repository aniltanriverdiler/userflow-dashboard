import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Reorder Albums
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="albums">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {albums.map((album, index) => (
                <Draggable
                  key={album.id.toString()}
                  draggableId={album.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4"
                    >
                      <h4 className="text-lg font-medium mb-1">
                        {album.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>User ID:</strong> {album.userId} <br />
                        <strong>Album ID:</strong> {album.id}
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

      {/* Save + Back Buttons */}
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
            Album order has been saved successfully! (Note: Changes are not
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

export default DraggableAlbumsPage;
