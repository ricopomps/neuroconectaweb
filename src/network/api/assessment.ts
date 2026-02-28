import { AssessmentWithUrl } from "@/lib/validation/assessments";
import { StudentFile } from "@/lib/validation/student";
import api from "@/network/axiosInstance";

const baseUrl = "assessment";

export async function generateDoc(files: StudentFile[]) {
  const response = await api.post<{ response: string }>(`${baseUrl}/generate`, {
    files,
  });
  return response.data.response;
}

export async function createAssessment(
  name: string,
  content: string,
  studentId: string,
) {
  const response = await api.post<string>(`${baseUrl}/save`, {
    name,
    content,
    studentId,
  });
  return response.data;
}

export async function updateAssessment(content: string, assessmentId: string) {
  const response = await api.patch<string>(`${baseUrl}/${assessmentId}`, { content });
  return response.data;
}

export async function getAssessments(studentId: string) {
  const response = await api.get<AssessmentWithUrl[]>(
    `${baseUrl}/student/${studentId}`,
  );
  return response.data;
}
