import type { LoaderFunctionArgs } from "react-router-dom";

export const userDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  if (!userId) {
    throw new Error("User ID bulunamadı.");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("Kullanıcı verisi yüklenemedim.");
  }

  const user = await response.json();
  return user;
};
