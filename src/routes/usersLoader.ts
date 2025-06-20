export const usersLoader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Kullanıcılar yüklenmedi!");
  }

  const users = await response.json();
  return users;
};
