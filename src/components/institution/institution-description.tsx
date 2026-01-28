"use client";

import { useAuth } from "@/contexts/auth";

interface InstitutionDescriptionProps {
  readonly institutionId: string;
}

export function InstitutionDescription({
  institutionId,
}: InstitutionDescriptionProps) {
  const { institutions } = useAuth();

  if (!institutions) {
    return (
      <div className="flex justify-center items-center h-full">
        Carregando...
      </div>
    );
  }

  const institution = institutions.find((inst) => inst.id === institutionId);

  if (!institution) {
    return (
      <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        Instituição não encontrada
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div>{institution.name}</div>
    </div>
  );
}
