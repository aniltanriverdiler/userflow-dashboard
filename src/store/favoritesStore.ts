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
  favoritesByUser: Record<number, Photo[]>;
  posts: Post[];
  hasHydrated: boolean;

  addPhoto: (photo: Photo, userId: number) => void;
  removePhoto: (photoId: number, userId: number) => void;
  isFavorite: (photoId: number, userId: number) => boolean;
  getPhotosByUser: (userId: number) => Photo[];

  addPost: (post: Post) => void;
  removePost: (postId: number) => void;
  isPostFavorite: (postId: number) => boolean;

  setHydrated: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoritesByUser: {},
      posts: [],
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
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); 
      },
    }
  )
);
