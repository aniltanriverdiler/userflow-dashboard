import { Card } from "@/components/ui/card";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ApiAlbum, ApiPhoto, ApiUser } from "../types/types";

function AlbumDetailPage() {
  const { album, photos, user } = useLoaderData() as {
    album: ApiAlbum;
    photos: ApiPhoto[];
    user: ApiUser;
  };

  const { user: currentUser } = useAuthStore();
  const userKey = currentUser?.id || "";
  const favoritePhotosFromStore = useFavoritesStore(
    (state) => state.favoritesByUser[userKey]
  );
  const favoritePhotos = favoritePhotosFromStore ?? [];
  const addPhoto = useFavoritesStore((state) => state.addPhoto);
  const removePhoto = useFavoritesStore((state) => state.removePhoto);

  const isPhotoFavorite = (photoId: number) => {
    return favoritePhotos.some((p) => p.id === photoId);
  };

  const isCheckUser = (uid: number) => {
    return favoritePhotos.some((p) => p.userId === uid);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      {/* Album Info Card */}
      <div className="mx-60 mb-12">
        <Card className="mb-8 p-7 bg-card rounded-2xl shadow-lg border border-border">
          <h4 className="text-2xl font-extrabold text-primary mb-2 truncate flex items-center gap-2">
            📷 {album.title}
          </h4>
          <p className="text-base text-accent">
            <strong>Owner:</strong>{" "}
            <Link
              to={`/users/${user.id}`}
              className="underline hover:text-primary transition"
            >
              {user.name}
            </Link>
          </p>
        </Card>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {photos.map((photo) => {
          const isFav = isPhotoFavorite(photo.id);
          const isCurrentAccount = isCheckUser(photo.userId);
          const toggleFavorite = () => {
            if (isFav) {
              removePhoto(photo.id, currentUser?.id || "");
            } else {
              addPhoto(photo, currentUser?.id || "");
            }
          };

          return (
            <Card
              key={photo.id}
              className="overflow-hidden rounded-xl shadow border border-border bg-card group transition-transform hover:scale-[1.03] hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-40 object-cover object-center rounded-t-xl group-hover:brightness-95 transition duration-200"
                />
                <button
                  onClick={toggleFavorite}
                  className={`absolute top-2 right-2 text-2xl rounded-full p-1 bg-background/80 shadow transition-all duration-200 border border-border ${
                    isFav && isCurrentAccount
                      ? "text-accent scale-110"
                      : "text-muted-foreground hover:text-accent hover:scale-105"
                  }`}
                  aria-label={
                    isFav && isCurrentAccount
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {isFav && isCurrentAccount ? "★" : "☆"}
                </button>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <p
                  className="truncate text-sm font-medium max-w-[150px] text-foreground"
                  title={photo.title}
                >
                  {photo.title}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-10">
        <Link to={`/users/${user.id}`}>
          <Button
            variant="outline"
            className="font-bold px-8 py-3 text-lg rounded-xl"
          >
            ← Return to User Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AlbumDetailPage;
