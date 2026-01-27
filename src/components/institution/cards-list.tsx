"use client";

import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";
import { InstitutionCard } from "./institution-card";
import { NewInstitutionCard } from "./new-institution-card";

export function CardsList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { institutions } = useAuth();

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full",
        className,
      )}
      {...props}
    >
      {institutions?.map((institution) => (
        <InstitutionCard key={institution.id} institution={institution} />
      ))}
      <NewInstitutionCard className="max-w-md mx-auto" />
    </div>
  );
}
