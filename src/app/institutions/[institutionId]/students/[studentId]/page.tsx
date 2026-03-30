"use client";
import { StudentCard } from "@/components/student/student-card";
import { StudentTabs } from "@/components/student/student-tabs";
import { Student, StudentCaseStudy } from "@/lib/validation/student";
import * as studentsApi from "@/network/api/student";
import { useEffect, useState } from "react";

interface StudentPageProps {
  params: Promise<{ studentId: string; institutionId: string }>;
}

export default function StudentPage({ params }: Readonly<StudentPageProps>) {
  const [resolvedParams, setResolvedParams] = useState<{
    studentId: string;
    institutionId: string;
  } | null>(null);

  const [student, setStudent] = useState<Student | null>(null);
  const [studentCaseStudy, setStudentCaseStudy] =
    useState<StudentCaseStudy | null>(null);

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
        setStudentCaseStudy(
          fetchedStudent?.caseStudies?.length
            ? fetchedStudent.caseStudies.toSorted(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              )[0]
            : null,
        );
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
        <StudentCard student={student} />
        <StudentTabs
          institutionId={student.institutionId}
          studentId={student.id}
          caseStudy={studentCaseStudy}
          setCaseStudy={setStudentCaseStudy}
        />
      </div>
    </div>
  );
}
