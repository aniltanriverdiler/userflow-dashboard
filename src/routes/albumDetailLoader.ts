import type { LoaderFunctionArgs } from "react-router-dom";

export const albumDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId, albumId } = params;

  if (!userId || !albumId) {
    throw new Error("Gerekli parametreler eksik!");
  }

  const [albumRes, photosRes, userRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
  ]);

  if (!albumRes.ok || !photosRes.ok || !userRes.ok) {
    throw new Error("Albüm detayları yüklenemedi!");
  }

  const album = await albumRes.json();
  const photos = await photosRes.json();
  const user = await userRes.json();

  return { album, photos, user };
};
