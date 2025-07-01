import type { LoaderFunctionArgs } from "react-router-dom";

export const albumDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId, albumId } = params;

  if (!userId || !albumId) {
    throw new Error("Required parameters are missing!");
  }

  const [albumRes, userRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
  ]);

  if (!albumRes.ok || !userRes.ok) {
    throw new Error("Could not load album or user!");
  }

  const album = await albumRes.json();
  const user = await userRes.json();

  // Fetching from Unsplash API
  const unsplashResponse = await fetch(
    `https://api.unsplash.com/photos?page=1&per_page=10&query=nature&client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }`
  );

  if (!unsplashResponse.ok) {
    throw new Error("Failed to fetch Unsplash photos!");
  }

  const unsplashPhotos = await unsplashResponse.json();

  // Normalizing JSON responses
  const photos = unsplashPhotos.map((photo: any, index: number) => ({
    id: index + 1,
    title: photo.description || photo.alt_description || "Untitled",
    url: photo.urls.full,
    thumbnailUrl: photo.urls.thumb,
    userId: Number(userId),
    albumId: Number(albumId),
  }));

  return { album, photos, user };
};
