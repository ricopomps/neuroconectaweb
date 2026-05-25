"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppRoutes } from "@/lib/routes";
import * as authApi from "@/network/api/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  async function onSubmit(data: ResetPasswordFormValues) {
    if (!token) {
      toast.error("Token de redefinição não encontrado.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      setIsSubmitting(true);
      await authApi.resetPassword(token, data.password);
      toast.success(
        "Senha redefinida com sucesso. Faça login com a nova senha.",
      );
      router.push(AppRoutes.LOGIN);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao redefinir senha.");
      } else {
        toast.error("Erro ao redefinir senha.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Redefinir senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2 relative">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Senha obrigatória" })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirmação de senha obrigatória",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {!token && (
                <div className="rounded-md border border-orange-500 bg-orange-50 p-4 text-sm text-orange-700">
                  Token de redefinição não encontrado. Verifique o link enviado
                  por email.
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting || !token}>
                  {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
                </Button>
                <Link
                  href={AppRoutes.LOGIN}
                  className="text-center text-sm text-primary underline-offset-4 hover:underline"
                >
                  Voltar ao login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
