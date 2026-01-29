"use client";

import { StudentCard } from "@/components/student/student-card";
import { StudentTabs } from "@/components/student/student-tabs";
import { Student } from "@/lib/validation/student";
import { useState } from "react";

// Mocked student data - replace with API call
const mockedStudent: Student = {
  id: "1",
  name: "João Silva",
  birthDate: new Date("2010-05-15"),
  institutionId: "1",
  createdAt: "2024-01-10",
};

export default function StudentPage() {
  const [student] = useState<Student>(mockedStudent);

  return (
    <div className="min-h-screen bg-muted px-4 py-8 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        <StudentCard student={student} />
        <StudentTabs />
      </div>
    </div>
  );
}
