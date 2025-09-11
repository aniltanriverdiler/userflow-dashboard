import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ApiPhoto, ApiPost } from "../types/types";

interface FavoritesState {
  favoritesByUser: Record<string, ApiPhoto[]>; // Changed to string for user ID
  postsByUser: Record<string, ApiPost[]>; // Changed to user-specific posts
  hasHydrated: boolean;

  addPhoto: (photo: ApiPhoto, userId: string) => void;
  removePhoto: (photoId: number, userId: string) => void;
  isFavorite: (photoId: number, userId: string) => boolean;
  getPhotosByUser: (userId: string) => ApiPhoto[];

  addPost: (post: ApiPost, userId: string) => void;
  removePost: (postId: number, userId: string) => void;
  isPostFavorite: (postId: number, userId: string) => boolean;
  getPostsByUser: (userId: string) => ApiPost[];

  setHydrated: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoritesByUser: {},
      postsByUser: {},
      hasHydrated: false,

      setHydrated: () => set({ hasHydrated: true }),

      addPhoto: (photo, userId) => {
        const current = get().favoritesByUser[userId] || [];
        if (current.some((p) => p.id === photo.id)) return;

        set((state) => ({
          favoritesByUser: {
            ...state.favoritesByUser,
            [userId]: [...current, photo],
          },
        }));
      },

      removePhoto: (photoId, userId) => {
        const current = get().favoritesByUser[userId] || [];
        set((state) => ({
          favoritesByUser: {
            ...state.favoritesByUser,
            [userId]: current.filter((p) => p.id !== photoId),
          },
        }));
      },

      isFavorite: (photoId, userId) => {
        const current = get().favoritesByUser[userId] || [];
        return current.some((p) => p.id === photoId);
      },

      getPhotosByUser: (userId) => {
        return get().favoritesByUser[userId] || [];
      },

      addPost: (post, userId) => {
        const current = get().postsByUser[userId] || [];
        if (current.some((p) => p.id === post.id)) return;

        set((state) => ({
          postsByUser: {
            ...state.postsByUser,
            [userId]: [...current, post],
          },
        }));
      },

      removePost: (postId, userId) => {
        const current = get().postsByUser[userId] || [];
        set((state) => ({
          postsByUser: {
            ...state.postsByUser,
            [userId]: current.filter((p) => p.id !== postId),
          },
        }));
      },

      isPostFavorite: (postId, userId) => {
        const current = get().postsByUser[userId] || [];
        return current.some((p) => p.id === postId);
      },

      getPostsByUser: (userId) => {
        return get().postsByUser[userId] || [];
      },
    }),
    {
      name: "favorites-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
