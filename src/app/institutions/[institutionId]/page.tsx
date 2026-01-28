import { InstitutionDescription } from "@/components/institution/institution-description";

interface InstitutionPageProps {
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionPage({
  params,
}: InstitutionPageProps) {
  const { institutionId } = await params;

  return <InstitutionDescription institutionId={institutionId} />;
}
