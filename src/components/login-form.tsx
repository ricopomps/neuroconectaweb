"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { AppRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { LoginRequest } from "@/lib/validation/auth";
import * as authApi from "@/network/api/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setAuth } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    // formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    // resolver: zodResolver(
    //   createPaymentSchemaWithPreferences(paymentTablePreferences),
    // ),
    // defaultValues: {
    //   cost: paymentToEdit?.cost ?? 0,
    //   expertise: paymentToEdit?.expertise ?? undefined,
    //   observations: paymentToEdit?.observations,
    //   pacientName: paymentToEdit?.pacientName,
    //   paymentMethod: paymentToEdit?.paymentMethod ?? undefined,
    //   procedure: paymentToEdit?.procedure,
    //   status: paymentToEdit?.status,
    //   userId: paymentToEdit?.userId,
    //   value: paymentToEdit?.value ?? 0,
    // },
  });

  async function onSubmit(data: LoginRequest) {
    try {
      const loginResponse = await authApi.login(data.email, data.password);
      if (loginResponse.token && loginResponse.user) {
        // Salvar no contexto e localStorage
        setAuth(loginResponse.token, loginResponse.user);
        toast.success("Login realizado com sucesso!");
        // Redirecionar para a página inicial
        router.push(AppRoutes.HOME);
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao fazer login");
      } else {
        toast.error("Erro ao fazer login");
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isSubmitting}
                  {...register("email", { required: "Email obrigatório" })}
                />
              </Field>
              <Field className="relative w-full">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Link
                    href={AppRoutes.FORGOT_PASSWORD}
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isSubmitting}
                  {...register("password", { required: "Senha obrigatória" })}
                  className="pr-10"
                />
                <div className="absolute top-10 left-75">
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <Eye
                      size={18}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Não possui conta ainda?{" "}
                  <Link href={AppRoutes.SIGNUP}>Registre-se</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
