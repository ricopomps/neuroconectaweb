"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STUDENT_SEGMENT_OPTIONS } from "@/lib/student-segments";
import { formatDate, getAge } from "@/lib/utils";
import { Student } from "@/lib/validation/student";
import * as studentApi from "@/network/api/student";
import { Camera, Edit2, UserRound, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DatePicker } from "../date-picker";

interface StudentCardProps {
  readonly student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(student);
  const [photoUrl, setPhotoUrl] = useState(student.photoUrl ?? "");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: currentStudent,
  });

  useEffect(() => {
    setCurrentStudent(student);
    reset(student);
  }, [student, reset]);

  useEffect(() => {
    let isMounted = true;

    async function fetchStudentPhoto() {
      try {
        const response = await studentApi.getFiles(
          student.institutionId,
          student.id,
          10,
          0,
        );

        const imageFile = response.files.find((file) =>
          /\.(png|jpe?g|gif|webp|bmp)$/i.test(file.name),
        );

        if (isMounted && imageFile) {
          setPhotoUrl(imageFile.url);
        }
      } catch {
        // Ignore, no photo available yet.
      }
    }

    fetchStudentPhoto();

    return () => {
      isMounted = false;
    };
  }, [student.id, student.institutionId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(currentStudent);
    setIsEditing(false);
  };

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", `students/${student.id}/documents/${file.name}`);
      formData.append("studentId", student.id);
      formData.append("institutionId", student.institutionId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        throw new Error(result?.error || "Erro ao enviar foto");
      }

      const uploadedPhotoUrl = result?.url ?? result?.fileUrl ?? "";
      if (uploadedPhotoUrl) {
        setPhotoUrl(uploadedPhotoUrl);
      }

      toast.success("Foto do aluno atualizada com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao enviar foto");
      }
    } finally {
      setIsUploadingPhoto(false);
      event.target.value = "";
    }
  };

  const onSubmit = async (data: Student) => {
    try {
      const updatedStudent = await studentApi.update(
        currentStudent.institutionId,
        currentStudent.id,
        {
          name: data.name,
          birthDate: data.birthDate,
          segment: data.segment?.trim() || undefined,
        },
      );

      setCurrentStudent(updatedStudent);
      reset(updatedStudent);
      setIsEditing(false);
      toast.success("Aluno atualizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao atualizar");
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Dados do Aluno</CardTitle>
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
        <div className="mb-6 flex items-center gap-4">
          <div className="relative">
            {photoUrl ? (
              <div className="h-20 w-20 overflow-hidden rounded-full border bg-muted">
                <Image
                  src={photoUrl}
                  alt={currentStudent.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                <UserRound className="h-8 w-8" />
              </div>
            )}
            <label className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:text-foreground">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={isUploadingPhoto}
              />
            </label>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Foto do aluno</p>
            <p className="text-sm font-medium">
              {isUploadingPhoto ? "Enviando foto..." : "Atualizar foto"}
            </p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name", { required: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <DatePicker<Student>
                  name="birthDate"
                  control={control}
                  maxDate={new Date()}
                  showMonthYearDropdown
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="segment">Segmento</Label>
                <select
                  id="segment"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  {...register("segment")}
                  defaultValue={currentStudent.segment ?? ""}
                >
                  <option value="">Selecione</option>
                  {STUDENT_SEGMENT_OPTIONS.map((segment) => (
                    <option key={segment} value={segment}>
                      {segment}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-2" />
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
              <p className="text-sm font-medium text-muted-foreground">Nome</p>
              <p className="text-base font-semibold">{currentStudent.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Segmento
              </p>
              <p className="text-base font-semibold">
                {currentStudent.segment || "Não informado"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Data de Nascimento
              </p>
              <p className="text-base font-semibold">
                {formatDate(currentStudent.birthDate)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Data de Criação
              </p>
              <p className="text-base font-semibold">
                {formatDate(currentStudent.createdAt)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Idade:
              </p>
              <p className="text-base font-semibold">
                {getAge(currentStudent.birthDate)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
