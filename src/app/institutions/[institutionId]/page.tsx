import { InstitutionDescription } from "@/components/institution/institution-description";
import { InstitutionSidebar } from "@/components/institution/institution-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface InstitutionPageProps {
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionPage({
  params,
}: InstitutionPageProps) {
  const { institutionId } = await params;

  return (
    <SidebarProvider>
      <InstitutionSidebar institutionId={institutionId} />
      <InstitutionDescription institutionId={institutionId} />
    </SidebarProvider>
  );
}
