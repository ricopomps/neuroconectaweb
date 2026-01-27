"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { AppRoutes } from "@/lib/routes";
import { CreateInstitutionRequest } from "@/lib/validation/institution";
import * as institutionApi from "@/network/api/institution";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function InstitutionForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { addInstitution } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateInstitutionRequest>({});

  async function onSubmit(data: CreateInstitutionRequest) {
    try {
      const createResponse = await institutionApi.create(data);
      if (createResponse?.id) {
        toast.success("Instituição criada com sucesso!");
        addInstitution(createResponse);
        router.push(AppRoutes.HOME);
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || "Erro ao criar instituição");
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Criar Nova Instituição</CardTitle>
        <CardDescription>
          Preencha as informações abaixo para criar uma nova instituição.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome da Instituição</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Nome da instituição"
                required
                disabled={isSubmitting}
                {...register("name", {
                  required: "Nome da instituição é obrigatório",
                })}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar Instituição"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
