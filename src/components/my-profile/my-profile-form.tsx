"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth";
import { UserWithPassword } from "@/models/user";
import * as authApi from "@/network/api/auth";
import * as userApi from "@/network/api/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function MyProfileForm() {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserWithPassword>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);

  async function onSubmit(data: UserWithPassword) {
    try {
      if (!user?.id) {
        toast.error("Erro ao obter usuário");
        return;
      }
      await userApi.update(user?.id, data);
      setUser({
        ...user,
        name: data.name,
        email: data.email,
      });
      toast.success("Perfil atualizado");
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || "Erro ao cadastrar");
    }
  }

  async function handleForgotPassword() {
    if (!user?.email) {
      toast.error("Email do usuário não disponível para recuperar senha");
      return;
    }

    try {
      setIsForgotSubmitting(true);
      await authApi.forgotPassword(user.email);
      toast.success(
        "Um email para troca de senha foi enviado para o email cadastrado",
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao solicitar troca de senha");
      } else {
        toast.error("Erro ao solicitar troca de senha");
      }
    } finally {
      setIsForgotSubmitting(false);
    }
  }

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-1">Email</Label>
              <Input disabled id="email-1" {...register("email")} />
            </div>
            <div className="flex gap-2 justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleForgotPassword}
                disabled={isForgotSubmitting || isSubmitting}
              >
                {isForgotSubmitting ? "Enviando..." : "Trocar Senha"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isForgotSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Atualizar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
