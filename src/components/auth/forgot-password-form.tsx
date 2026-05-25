"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AppRoutes } from "@/lib/routes";
import * as authApi from "@/network/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ForgotPasswordFormValues = {
  email: string;
};

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      setIsSubmitting(true);
      await authApi.forgotPassword(data.email);
      toast.success("Verifique seu email para redefinir sua senha.");
      router.push(AppRoutes.LOGIN);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao enviar email de redefinição.");
      } else {
        toast.error("Erro ao enviar email de redefinição.");
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
            <CardTitle>Esqueceu sua senha?</CardTitle>
            <CardDescription>
              Digite seu email para receber um link de redefinição de senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isSubmitting}
                    {...register("email", {
                      required: "Email obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido",
                      },
                    })}
                  />
                  {errors.email && (
                    <FieldDescription className="text-destructive">
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
              </Button>

              <div className="text-center text-sm">
                Lembrou sua senha?{" "}
                <Link
                  href={AppRoutes.LOGIN}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Faça login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
