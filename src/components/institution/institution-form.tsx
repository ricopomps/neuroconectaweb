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
              <FieldLabel htmlFor="address">Endereço</FieldLabel>
              <Input
                id="address"
                type="text"
                placeholder="Rua, número, bairro"
                disabled={isSubmitting}
                {...register("address")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="city">Cidade</FieldLabel>
              <Input
                id="city"
                type="text"
                placeholder="Cidade"
                disabled={isSubmitting}
                {...register("city")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="state">Estado</FieldLabel>
              <Input
                id="state"
                type="text"
                placeholder="Estado"
                disabled={isSubmitting}
                {...register("state")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Telefone</FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                disabled={isSubmitting}
                {...register("phone")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="contato@instituicao.com"
                disabled={isSubmitting}
                {...register("email")}
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
