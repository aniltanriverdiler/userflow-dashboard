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

function UsersPage() {
  const users = useLoaderData() as User[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="p-5 flex flex-col justify-between">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
              <div className="text-sm text-left mt-3">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Company:</strong> {user.company.name}
                </p>
                <p>
                  <strong>City:</strong> {user.address.city}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <Link to={`/users/${user.id}`}>
                <Button variant="outline" size="sm">
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
