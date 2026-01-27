import { Institution } from "@/models/institution";
import api from "@/network/axiosInstance";

const baseUrl = "institutions";

export async function create(data: { name: string }) {
  const response = await api.post<Institution>(baseUrl, data);
  return response.data;
}

export async function list() {
  const response = await api.get<Institution[]>(baseUrl);
  return response.data;
}
