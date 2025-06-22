import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritePhoto {
    userId: number;
    albumId: number;
    id: number;
    title:string;
    url: string;
    thumbnailUrl: string;
}

interface FavoritesStore {
    photos: FavoritePhoto[];
    addPhoto: (photo: FavoritePhoto) => void;
    removePhoto: (photoId: number) => void;
    isFavorite: (photoId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      photos: [],
      addPhoto: (photo) => {
        const existing = get().photos.find((p) => p.id === photo.id);
        if (!existing) {
          set((state) => ({ photos: [...state.photos, photo] }));
        }
      },
      removePhoto: (photoId) => {
        set((state) => ({
          photos: state.photos.filter((p) => p.id !== photoId),
        }));
      },
      isFavorite: (photoId) => {
        return get().photos.some((p) => p.id === photoId);
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);