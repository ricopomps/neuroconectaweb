import { CreateInstitutionRequest } from "@/lib/validation/institution";
import { UsersPaginated } from "@/lib/validation/user";
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

export async function addUser(institutionId: string, userId: string) {
  const response = await api.post(`${baseUrl}/${institutionId}/users`, {
    userId,
  });
  return response.data;
}

export async function removeUser(institutionId: string, userId: string) {
  const response = await api.delete(
    `${baseUrl}/${institutionId}/users/${userId}`,
  );
  return response.data;
}

export async function getUsers(
  institutionId: string,
  options?: {
    excludeInstitution?: boolean;
    search?: string;
    skip?: number;
    take?: number;
  },
) {
  const params = new URLSearchParams();

  if (options?.excludeInstitution) {
    params.append("excludeInstitution", true.toString());
  }

  if (options?.search) {
    params.append("search", options.search);
  }

  if (options?.skip !== undefined) {
    params.append("skip", options.skip.toString());
  }

  if (options?.take !== undefined) {
    params.append("take", options.take.toString());
  }

  const response = await api.get<UsersPaginated>(
    `${baseUrl}/${institutionId}/users?${params.toString()}`,
  );

  return response.data;
}
