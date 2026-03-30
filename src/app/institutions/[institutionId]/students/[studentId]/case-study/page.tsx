"use client";
import { StudentCaseStudyForm } from "@/components/student/student-case-study-form";
import { Student, StudentCaseStudy } from "@/lib/validation/student";
import * as studentsApi from "@/network/api/student";
import { useEffect, useState } from "react";

interface CaseStudyPageProps {
  params: Promise<{ studentId: string; institutionId: string }>;
}

export default function CaseStudyPage({
  params,
}: Readonly<CaseStudyPageProps>) {
  const [resolvedParams, setResolvedParams] = useState<{
    studentId: string;
    institutionId: string;
  } | null>(null);

  const [student, setStudent] = useState<Student | null>(null);
  const [caseStudy, setCaseStudy] = useState<StudentCaseStudy | null>(null);

  useEffect(() => {
    params
      .then((params) => {
        if (
          params.studentId === resolvedParams?.studentId &&
          params.institutionId === resolvedParams?.institutionId
        ) {
          return;
        }
        setResolvedParams(params);
      })
      .catch(console.error);
  }, [params, resolvedParams]);

  useEffect(() => {
    if (!resolvedParams) return;

    const { studentId, institutionId } = resolvedParams;

    async function fetchStudent() {
      try {
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
  }, [resolvedParams]);

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
        <h1 className="text-2xl font-bold">Estudo de Caso - {student.name}</h1>
        <StudentCaseStudyForm
          institutionId={student.institutionId}
          studentId={student.id}
          caseStudy={caseStudy}
          setCaseStudy={setCaseStudy}
        />
      </div>
    </div>
  );
}
