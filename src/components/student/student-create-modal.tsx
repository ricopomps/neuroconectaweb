"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STUDENT_SEGMENT_OPTIONS } from "@/lib/student-segments";
import { Student } from "@/lib/validation/student";
import * as studentApi from "@/network/api/student";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DatePicker } from "../date-picker";

interface StudentCreateModalProps {
  readonly institutionId: string;
  readonly handleCreate: (student: Student) => void;
}

export function StudentCreateModal({
  institutionId,
  handleCreate,
}: StudentCreateModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: {
      segment: "",
    },
  });

  const [open, setOpen] = useState(false);
  async function onSubmit(data: Student) {
    try {
      const studentPayload = {
        ...data,
        segment: data.segment?.trim() || undefined,
      };

      const studentResponse = await studentApi.create(
        institutionId,
        studentPayload,
      );

      if (studentResponse?.id) {
        toast.success("Cadastro realizado com sucesso!");
        handleCreate(studentResponse);
        setOpen(false);
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || "Erro ao cadastrar");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Adicionar Aluno
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Cadastrar aluno</DialogTitle>
            <DialogDescription>
              Adicione os dados do aluno abaixo para criar o cadastro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nome</Label>
              <Input id="name-1" {...register("name")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="segment">Segmento</Label>
              <select
                id="segment"
                {...register("segment")}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Selecione</option>
                {STUDENT_SEGMENT_OPTIONS.map((segment) => (
                  <option key={segment} value={segment}>
                    {segment}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3 mb-4">
              <DatePicker<Student>
                name="birthDate"
                control={control}
                label="Data de nascimento"
                maxDate={new Date()}
                showMonthYearDropdown
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
