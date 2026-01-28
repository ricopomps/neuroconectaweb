import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export function NewInstitutionCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Link href={AppRoutes.INSTITUTIONS_CREATE}>
      <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Cadastrar nova instituição
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Plus className="w-full h-full max-w-2xs max-h-2xs" />
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
