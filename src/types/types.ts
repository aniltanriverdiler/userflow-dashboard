// Centralized domain and API types

export interface ApiUser {
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

export interface ApiAlbum {
  id: number;
  title: string;
  userId: number;
}

export interface ApiPhoto {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
  userId: number;
}

export interface ApiPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiComment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ApiTodo {
  id: number;
  title: string;
  completed: boolean;
}

// Auth store specific user type
export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}


