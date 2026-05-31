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
  confirmationCode?: string;
}) {
  if (data.password !== data.confirmPassword) {
    throw new Error("Senhas não coincidem");
  }
  const response = await api.post<SignupResponse>(baseUrl, data);
  return response.data;
}

export async function requestConfirmationCode(email: string) {
  const response = await api.post(`${baseUrl}/confirmation-code`, { email });
  return response.data;
}

export async function update(
  id: string,
  data: {
    name: string;
    email: string;
    password: string;
  },
) {
  const response = await api.put<SignupResponse>(`${baseUrl}/${id}`, data);
  return response.data;
}
