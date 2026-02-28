"use client";

import { useAuth } from "@/contexts/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Institution } from "@/models/institution";
import { Edit2 } from "lucide-react";

interface InstitutionDescriptionProps {
  readonly institutionId: string;
}

// mocked default data used when demonstrating the form
const mockInstitution: Institution = {
  id: "visao-mock",
  name: "Colégio Visão",
  address: "Av. Dr. José Rufino, 241 - Estância, Recife - PE, CEP: 50771-600",
  city: "Recife",
  state: "PE",
  phone: "(81) 3251-0169",
  email: "administracao@colegiovisao.com.br",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function InstitutionDescription({
  institutionId,
}: InstitutionDescriptionProps) {
  const { institutions } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Institution>({
    defaultValues: mockInstitution,
  });

  const institution = institutions?.find((inst) => inst.id === institutionId);

  useEffect(() => {
    if (institution) {
      reset({ ...mockInstitution, ...institution });
    } else {
      reset(mockInstitution);
    }
  }, [institution, reset]);

  if (!institutions) {
    return (
      <div className="flex justify-center items-center h-full">
        Carregando...
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        Instituição não encontrada
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset({ ...mockInstitution, ...institution });
    setIsEditing(false);
  };

  const onSubmit = async (data: Institution) => {
    try {
      console.log("Updating institution:", data);
      toast.success("Instituição atualizada com sucesso!");
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao atualizar");
      }
    }
  };

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Dados da Instituição</CardTitle>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEditClick}
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name", { required: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" {...register("address")} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...register("city")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" {...register("state")} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" {...register("email")} />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Nome
                </p>
                <p className="text-base font-semibold">
                  {institution.name ?? mockInstitution.name}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Endereço
                </p>
                <p className="text-base font-semibold">
                  {institution.address ?? mockInstitution.address}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Cidade
                </p>
                <p className="text-base font-semibold">
                  {institution.city ?? mockInstitution.city}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Estado
                </p>
                <p className="text-base font-semibold">
                  {institution.state ?? mockInstitution.state}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Telefone
                </p>
                <p className="text-base font-semibold">
                  {institution.phone ?? mockInstitution.phone}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  E-mail
                </p>
                <p className="text-base font-semibold">
                  {institution.email ?? mockInstitution.email}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Criado em
                </p>
                <p className="text-base font-semibold">
                  {new Date(institution.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Atualizado em
                </p>
                <p className="text-base font-semibold">
                  {new Date(institution.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
