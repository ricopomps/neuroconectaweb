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
import { SignupRequest } from "@/lib/validation/user";
import * as userApi from "@/network/api/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<SignupRequest>({});

  const emailValue = watch("email") || "";
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  async function onSubmit(data: SignupRequest) {
    try {
      const signupResponse = await userApi.create(data);
      if (signupResponse?.id) {
        toast.success("Cadastro realizado com sucesso!");
        router.push(AppRoutes.LOGIN);
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || "Erro ao cadastrar");
    }
  }

  async function handleRequestCode() {
    if (!isValidEmail(emailValue)) return;
    setIsRequestingCode(true);
    try {
      await userApi.requestConfirmationCode(emailValue);
      toast.success("Código solicitado. Verifique seu e-mail.");
      setCooldownEnd(Date.now() + 60_000);
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message || "Erro ao solicitar código");
      else toast.error("Erro ao solicitar código");
    } finally {
      setIsRequestingCode(false);
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (cooldownEnd) {
      const update = () => {
        const diff = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
        setCooldownSeconds(diff);
        if (diff <= 0) {
          setCooldownEnd(null);
          setCooldownSeconds(0);
          if (timer) clearInterval(timer);
        }
      };
      update();
      timer = setInterval(update, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldownEnd]);

  let requestButtonLabel = "Solicitar código";
  if (isRequestingCode) requestButtonLabel = "Enviando...";
  else if (cooldownSeconds > 0)
    requestButtonLabel = `Aguardar ${cooldownSeconds}s`;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>
          Coloque suas informações abaixo para criar uma nova conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                required
                disabled={isSubmitting}
                {...register("name", { required: "Nome é obrigatório" })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <div className="flex gap-2 items-center">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isSubmitting}
                  {...register("email", { required: "Email é obrigatório" })}
                />
                <Button
                  type="button"
                  onClick={handleRequestCode}
                  disabled={
                    isRequestingCode ||
                    !!cooldownEnd ||
                    !isValidEmail(emailValue)
                  }
                >
                  {requestButtonLabel}
                </Button>
              </div>
              <FieldDescription>
                Esse e-mail será usado para contato e login na sua conta.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                disabled={isSubmitting}
                {...register("password", { required: "Senha é obrigatória" })}
              />
              <FieldDescription>
                No mínimo 8 caracteres, incluindo letras e números.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirme a senha
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                disabled={isSubmitting}
                {...register("confirmPassword", {
                  required: "Confirmação de senha é obrigatória",
                })}
              />
              <FieldDescription>
                Por favor, confirme sua senha.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmationCode">
                Código de confirmação
              </FieldLabel>
              <Input
                id="confirmationCode"
                type="text"
                placeholder="Código recebido por e-mail"
                disabled={isSubmitting}
                {...register("confirmationCode")}
              />
              <FieldDescription>
                Insira o código que você recebeu por e-mail.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Criando conta..." : "Criar conta"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta? <Link href={AppRoutes.LOGIN}>Entrar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
