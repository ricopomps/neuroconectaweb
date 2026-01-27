import api from "@/network/axiosInstance";

const baseUrl = "users";

interface SignupResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export async function create(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (data.password !== data.confirmPassword) {
    throw new Error("Senhas não coincidem");
  }
  const response = await api.post<SignupResponse>(baseUrl, data);
  return response.data;
}
