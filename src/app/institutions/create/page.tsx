import { InstitutionForm } from "@/components/institution/institution-form";

export default function CreateInstitutionPage() {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <InstitutionForm className="w-full max-w-md" />
    </div>
  );
}
