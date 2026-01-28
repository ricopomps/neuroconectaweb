import { InstitutionSidebar } from "@/components/institution/institution-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface InstitutionLayoutProps {
  children: React.ReactNode;
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionLayout({
  children,
  params,
}: InstitutionLayoutProps) {
  const { institutionId } = await params;

  return (
    <SidebarProvider>
      <InstitutionSidebar institutionId={institutionId} />
      {children}
    </SidebarProvider>
  );
}
