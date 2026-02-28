import { CreateInstitutionRequest } from "@/lib/validation/institution";
import { Institution } from "@/models/institution";
import api from "@/network/axiosInstance";

const baseUrl = "institutions";

export async function create(data: CreateInstitutionRequest) {
  const response = await api.post<Institution>(baseUrl, data);
  return response.data;
}

export async function list() {
  const response = await api.get<Institution[]>(baseUrl);
  return response.data;
}
