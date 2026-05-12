"use client";
import * as userApi from "@/network/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserWithPassword } from "@/models/user";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface StudentCreateModalProps {
  readonly institutionId: string;
}

export function MyProfileForm() {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<UserWithPassword>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

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
              <Input id="email-1" {...register("email")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative w-full">
              <div className="space-y-2">
                <Label htmlFor="pass-1">Senha</Label>
                <Input
                  id="pass-1"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <div className="absolute top-8 left-68">
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
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Atualizar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
