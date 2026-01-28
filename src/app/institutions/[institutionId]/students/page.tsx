import { StudentGrid } from "@/components/student/student-grid";
interface StudentsPageProps {
  params: Promise<{ institutionId: string }>;
}
export default async function StudentsPage({ params }: StudentsPageProps) {
  const { institutionId } = await params;
  return <StudentGrid institutionId={institutionId} />;
}
