import { Card } from "@/components/ui/card";
import { useFavoritesStore } from "../store/favoritesStore";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Album {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId: number;
  albumId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
}

function AlbumDetailPage() {
  const { album, photos, user } = useLoaderData() as {
    album: Album;
    photos: Photo[];
    user: User;
  };

  const currentUserId = Number(localStorage.getItem("current_user_id"));

  const favoritePhotos =
    useFavoritesStore((state) => state.favoritesByUser[currentUserId]) || [];

  const addPhoto = useFavoritesStore((state) => state.addPhoto);
  const removePhoto = useFavoritesStore((state) => state.removePhoto);

  const isPhotoFavorite = (photoId: number) => {
    return favoritePhotos.some((p) => p.id === photoId);
  };

  const isCheckUser = (uid: number) => {
    return favoritePhotos.some((p) => p.userId === uid);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Album Info Card */}
      <Card className="mb-6 p-4">
        <h4 className="text-xl font-semibold mb-2 truncate">{album.title}</h4>
        <p className="text-gray-600">
          <strong>Owner:</strong>{" "}
          <Link
            to={`/users/${user.id}`}
            className="underline text-blue-600 hover:text-blue-800"
          >
            {user.name}
          </Link>
        </p>
      </Card>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => {
          const isFav = isPhotoFavorite(photo.id);
          const isCurrentAccount = isCheckUser(photo.userId);
          const toggleFavorite = () => {
            if (isFav) {
              removePhoto(photo.id, currentUserId);
            } else {
              addPhoto(photo, currentUserId);
            }
          };

          return (
            <Card key={photo.id} className="overflow-hidden">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full auto"
              />
              <div className="flex items-center justify-between px-4 py-3">
                <p
                  className="truncate text-sm font-medium max-w-[150px]"
                  title={photo.title}
                >
                  {photo.title}
                </p>
                <button
                  onClick={toggleFavorite}
                  className={`text-xl transition ${
                    isFav && isCurrentAccount ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {isFav && isCurrentAccount ? "♥" : "♡"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Link to={`/users/${user.id}`}>
          <Button variant="secondary">← Return to User Profile</Button>
        </Link>
      </div>
    </div>
  );
}

export default AlbumDetailPage;
