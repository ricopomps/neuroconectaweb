"use client";
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

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await studentApi.getAllByInstitution(institutionId);
        setStudents(response);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    }

    fetchStudents();
  }, [institutionId]);

  const handleCreate = (student: Student) => {
    setStudents((prevStudents) => [student, ...prevStudents]);
  };
  return (
    <div className="bg-muted row min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="text-right mb-4">
        <StudentCreateModal
          institutionId={institutionId}
          handleCreate={handleCreate}
        />
      </div>
      <StudentList students={students} />
    </div>
  );
}
