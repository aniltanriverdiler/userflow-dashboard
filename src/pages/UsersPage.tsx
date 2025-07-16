import { useLoaderData, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

function getAvatarColor(name: string) {
  // Maskülen, soft renkler
  const colors = [
    "bg-primary/90",
    "bg-secondary/80",
    "bg-accent/80",
    "bg-muted/80",
    "bg-gray-700",
    "bg-gray-900",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}

function UsersPage() {
  const users = useLoaderData() as User[];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-primary tracking-tight">
        Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {users.map((user) => (
          <Card
            key={user.id}
            className="relative group p-7 flex flex-col justify-between items-center bg-card rounded-2xl shadow-lg border border-border hover:scale-[1.03] hover:shadow-xl transition-transform duration-200"
          >
            {/* Avatar */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow mb-4 border-4 border-background ${getAvatarColor(
                user.name
              )} group-hover:scale-105 transition-transform`}
            >
              {user.name[0]}
            </div>
            {/* Name & Username */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-primary">
                {user.name}
              </h2>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted text-primary shadow-none">
                @{user.username}
              </span>
            </div>
            {/* Info */}
            <div className="text-sm text-left mt-4 space-y-1 w-full">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Company:</strong> <span className="font-semibold text-accent">{user.company.name}</span>
              </p>
              <p>
                <strong>City:</strong> <span className="font-semibold text-secondary">{user.address.city}</span>
              </p>
            </div>
            {/* Button */}
            <div className="mt-6 flex justify-center w-full">
              <Link to={`/users/${user.id}`} className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-bold"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
