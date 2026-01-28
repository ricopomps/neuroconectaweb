import { Student } from "@/lib/validation/student";
import api from "@/network/axiosInstance";

const baseUrl = "students";

export async function create(
  institutionId: string,
  data: { name: string; birthDate: Date },
) {
  const response = await api.post<Student>(
    `${baseUrl}/${institutionId}/students`,
    data,
  );
  return response.data;
}

export async function getAllByInstitution(institutionId: string) {
  const response = await api.get<Student[]>(
    `${baseUrl}/${institutionId}/students`,
  );
  return response.data;
}
