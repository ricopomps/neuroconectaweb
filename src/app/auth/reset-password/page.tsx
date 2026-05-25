import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          Carregando...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
