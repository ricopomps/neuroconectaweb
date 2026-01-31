"use client";
import { StudentCard } from "@/components/student/student-card";
import { StudentTabs } from "@/components/student/student-tabs";
import { Student } from "@/lib/validation/student";
import * as studentsApi from "@/network/api/student";
import { useEffect, useState } from "react";

interface StudentPageProps {
  params: { studentId: string; institutionId: string };
}

export default function StudentPage({ params }: StudentPageProps) {
  const [student, setStudent] = useState<Student | null>(null);
  useEffect(() => {
    async function fetchStudent() {
      try {
        const { studentId, institutionId } = await params;

        const fetchedStudent = await studentsApi.getById(
          institutionId,
          studentId,
        );
        setStudent(fetchedStudent);
      } catch (error) {
        console.error("Failed to fetch student:", error);
      }
    }
    fetchStudent();
  }, [params]);

  if (!student) {
    return (
      <div className="min-h-screen bg-muted px-4 py-8 sm:px-6 lg:px-8 w-full">
        Carregando...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-muted px-4 py-8 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        <StudentCard student={student} />
        <StudentTabs
          institutionId={student.institutionId}
          studentId={student.id}
        />
      </div>
    </div>
  );
}
