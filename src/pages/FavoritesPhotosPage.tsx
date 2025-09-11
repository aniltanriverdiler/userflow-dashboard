import { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ApiPhoto } from "../types/types";

function FavoritesPhotosPage() {
  const { user } = useAuthStore();
  const removePhoto = useFavoritesStore((state) => state.removePhoto);
  const hasHydrated = useFavoritesStore((state) => state.hasHydrated);

  const [photos, setPhotos] = useState<ApiPhoto[]>([]);

  useEffect(() => {
    const userKey = user?.id || "";
    const unsubscribe = useFavoritesStore.subscribe((state) => {
      const list = state.favoritesByUser[userKey] ?? [];
      setPhotos(list);
    });
    const initial = useFavoritesStore.getState().favoritesByUser[userKey] ?? [];
    setPhotos(initial);
    return () => unsubscribe();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-600">
          Please log in to view your favorite photos.
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
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-primary tracking-tight">
        Favorite Photos
      </h2>
      {photos.length === 0 ? (
        <p className="text-muted-foreground text-center">You don't have any favorite photos yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden rounded-xl shadow border border-border bg-card group flex flex-col h-full">
              <div className="relative">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-36 object-cover object-center rounded-t-xl group-hover:brightness-95 transition duration-200"
                />
              </div>
              <div className="flex flex-col flex-1 justify-between p-4">
                <p className="text-sm font-medium truncate text-foreground mb-3 text-center" title={photo.title}>
                  📸 {photo.title}
                </p>
                <div className="flex justify-between gap-4 mt-auto">
                  <Link to={`/users/${photo.userId}/albums/${photo.albumId}`} className="w-1/2">
                    <Button size="sm" className="w-full font-semibold" variant="outline">
                      🗂️ Go to Album
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removePhoto(photo.id, user?.id || "")}
                    className="w-1/2 font-semibold text-lg text-accent hover:scale-105 transition-all"
                    aria-label="Remove from favorites"
                  >
                    ★ Remove
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
