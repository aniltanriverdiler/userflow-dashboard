// src/store/favoritesStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
  userId: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface FavoritesState {
  photos: Photo[];
  posts: Post[];
  addPhoto: (photo: Photo) => void;
  removePhoto: (photoId: number) => void;
  isFavorite: (photoId: number) => boolean;

  addPost: (post: Post) => void;
  removePost: (postId: number) => void;
  isPostFavorite: (postId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      photos: [],
      posts: [],
      addPhoto: (photo) =>
        set((state) => ({
          photos: [...state.photos, photo],
        })),
      removePhoto: (photoId) =>
        set((state) => ({
          photos: state.photos.filter((p) => p.id !== photoId),
        })),
      isFavorite: (photoId) => get().photos.some((p) => p.id === photoId),

      addPost: (post) =>
        set((state) => ({
          posts: [...state.posts, post],
        })),
      removePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== postId),
        })),
      isPostFavorite: (postId) => get().posts.some((p) => p.id === postId),
    }),
    {
      name: "favorites-storage",
    }
  )
);
