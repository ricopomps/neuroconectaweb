export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserWithPassword {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}
