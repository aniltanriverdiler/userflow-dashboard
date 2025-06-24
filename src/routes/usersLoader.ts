export const usersLoader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Failed to load users!");
  }

  const users = await response.json();
  return users;
};
