import { AuditLogGrid } from "@/components/audit-report/audit-log-grid";

interface AuditLogPageProps {
  params: Promise<{ institutionId: string }>;
}
export default async function StudentsPage({ params }: AuditLogPageProps) {
  const { institutionId } = await params;
  return <AuditLogGrid institutionId={institutionId} />;
}
