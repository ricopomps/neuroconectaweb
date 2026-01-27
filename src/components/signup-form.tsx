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
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupRequest>({});

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
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isSubmitting}
                {...register("email", { required: "Email é obrigatório" })}
              />
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
