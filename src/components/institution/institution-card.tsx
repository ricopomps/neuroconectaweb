import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppRoutes, buildRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Institution } from "@/models/institution";
import { Landmark } from "lucide-react";
import Link from "next/link";

interface InstitutionCardProps extends React.ComponentProps<"div"> {
  readonly institution: Institution;
}

export function InstitutionCard({
  className,
  institution,
  ...props
}: InstitutionCardProps) {
  return (
    <Link
      href={buildRoute(AppRoutes.INSTITUTION, {
        institutionId: institution.id,
      })}
    >
      <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{institution.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Landmark className="w-full h-full max-w-2xs max-h-2xs" />
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
