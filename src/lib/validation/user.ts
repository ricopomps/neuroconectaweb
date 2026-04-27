import { User } from "@/models/user";

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UsersPaginated = {
  users: User[];
  count: number;
};
