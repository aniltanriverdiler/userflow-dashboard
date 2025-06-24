import type { LoaderFunctionArgs } from "react-router-dom";

export const postDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId, postId } = params;

  if (!userId || !postId) {
    throw new Error("Required parameters are missing!");
  }

  const [postRes, commentsRes, userRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
  ]);

  if (!postRes.ok || !commentsRes.ok || !userRes.ok) {
    throw new Error("Failed to fetch data!");
  }

  const post = await postRes.json();
  const comments = await commentsRes.json();
  const user = await userRes.json();

  return { post, comments, user };
};
