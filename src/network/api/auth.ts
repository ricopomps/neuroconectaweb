import { User } from "@/models/user";
import api from "@/network/axiosInstance";

const baseUrl = "auth";

interface LoginResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>(`${baseUrl}/login`, {
    email,
    password,
  });
  return response.data;
}
