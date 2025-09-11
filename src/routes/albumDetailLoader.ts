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

  // Try Unsplash first; if it fails or key missing, fallback to JSONPlaceholder
  let photos: Array<{
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    userId: number;
    albumId: number;
  }>;
  const clientKey = (import.meta as any).env?.VITE_UNSPLASH_ACCESS_KEY;
  try {
    if (!clientKey) {
      throw new Error("Missing Unsplash key");
    }
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos?page=1&per_page=12&query=nature&client_id=${clientKey}`
    );
    if (!unsplashResponse.ok) {
      throw new Error("Failed to fetch Unsplash photos");
    }
    const unsplashPhotos = await unsplashResponse.json();
    photos = unsplashPhotos.map((photo: any, index: number) => ({
      id: index + 1,
      title: photo.description || photo.alt_description || "Untitled",
      url: photo.urls.full,
      thumbnailUrl: photo.urls.thumb,
      userId: Number(userId),
      albumId: Number(albumId),
    }));
  } catch {
    // Fallback: use JSONPlaceholder photos filtered by albumId
    const phRes = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
    if (!phRes.ok) {
      throw new Error("Failed to fetch fallback photos");
    }
    const ph = await phRes.json();
    photos = ph.slice(0, 12).map((p: any) => ({
      id: p.id,
      title: p.title,
      url: p.url,
      thumbnailUrl: p.thumbnailUrl,
      userId: Number(userId),
      albumId: Number(albumId),
    }));
  }

  return { album, photos, user };
};
