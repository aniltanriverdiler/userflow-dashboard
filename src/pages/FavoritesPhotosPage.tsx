import { useEffect, useState } from "react";
import { useFavoritesStore, type Photo } from "../store/favoritesStore";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function FavoritesPhotosPage() {
  const currentUserId = Number(localStorage.getItem("current_user_id"));
  const removePhoto = useFavoritesStore((state) => state.removePhoto);
  const hasHydrated = useFavoritesStore((state) => state.hasHydrated);

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const unsubscribe = useFavoritesStore.subscribe((state) => {
      setPhotos(state.getPhotosByUser(currentUserId));
    });
    setPhotos(useFavoritesStore.getState().getPhotosByUser(currentUserId));
    return () => unsubscribe();
  }, [currentUserId]);

  if (!currentUserId) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-600">
          No user selected. Please log in or choose a user.
        </p>
      </div>
    );
  }

  if (!hasHydrated) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-600">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Favorite Photos</h2>
      {photos.length === 0 ? (
        <p className="text-gray-600">You don't have any favorite photos yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-auto"
              />
              <div className="p-4 space-y-2">
                <p className="text-sm font-medium truncate" title={photo.title}>
                  {photo.title}
                </p>
                <div className="flex justify-between gap-2">
                  <Link to={`/users/${photo.userId}/albums/${photo.albumId}`}>
                    <Button size="sm">Go to Album</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(photo.id, currentUserId)}
                  >
                    ♥ Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPhotosPage;
