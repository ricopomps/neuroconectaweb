"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Student } from "@/lib/validation/student";
import * as studentApi from "@/network/api/student";
import { useEffect, useState } from "react";
import { StudentCreateModal } from "./student-create-modal";
import { StudentList } from "./student-list";

interface StudentGridProps {
  readonly institutionId: string;
}

export function StudentGrid({ institutionId }: StudentGridProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        setIsLoading(true);
        const response = await studentApi.getAllByInstitution(institutionId);
        setStudents(response);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
  }, [institutionId]);

  const handleCreate = (student: Student) => {
    setStudents((prevStudents) => [student, ...prevStudents]);
  };

  if (isLoading) {
    return (
      <div className="bg-muted row min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-8" />
            <p className="text-sm text-muted-foreground">
              Carregando alunos...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted row min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="text-right mb-4">
        <StudentCreateModal
          institutionId={institutionId}
          handleCreate={handleCreate}
        />
      </div>
      {students.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Nenhum aluno registrado ainda
              </p>
              <p className="text-xs text-muted-foreground">
                Clique no botão acima para criar um novo aluno
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <StudentList students={students} />
      )}
    </div>
  );
}
