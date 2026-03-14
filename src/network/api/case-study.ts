import { StudentCaseStudy } from "@/lib/validation/student";
import api from "@/network/axiosInstance";

const baseUrl = "case-study";

export async function createCaseStudy(
  institutionId: string,
  studentId: string,
  data: Omit<StudentCaseStudy, "id" | "studentId" | "createdAt" | "updatedAt">,
) {
  const response = await api.post<StudentCaseStudy>(
    `${baseUrl}/${institutionId}/students/${studentId}`,
    data,
  );
  return response.data;
}

export async function getCaseStudy(institutionId: string, studentId: string) {
  const response = await api.get<StudentCaseStudy>(
    `${baseUrl}/${institutionId}/students/${studentId}`,
  );
  return response.data;
}

export async function updateCaseStudy(
  institutionId: string,
  studentId: string,
  data: Partial<
    Omit<StudentCaseStudy, "id" | "studentId" | "createdAt" | "updatedAt">
  >,
) {
  const response = await api.put<StudentCaseStudy>(
    `${baseUrl}/${institutionId}/students/${studentId}`,
    data,
  );
  return response.data;
}
