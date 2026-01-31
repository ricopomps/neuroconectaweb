import { Student, StudentFilesPaginated } from "@/lib/validation/student";
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

export async function getById(institutionId: string, studentId: string) {
  const response = await api.get<Student>(
    `${baseUrl}/${institutionId}/students/${studentId}`,
  );
  return response.data;
}

export async function getFiles(
  institutionId: string,
  studentId: string,
  take?: number,
  skip?: number,
) {
  const response = await api.get<StudentFilesPaginated>(
    `${baseUrl}/${institutionId}/students/${studentId}/files`,
    { params: { take, skip } },
  );
  return response.data;
}
