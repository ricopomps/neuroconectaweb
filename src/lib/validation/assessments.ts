import { Dispatch, SetStateAction } from "react";
import { StudentCaseStudy } from "./student";

export interface Assessment {
  id: string;
  name: string;
  createdAt: string;
  content: string;
  status?: "completed" | "pending" | "in-progress";
  score?: number;
}

export interface AssessmentWithUrl extends Assessment {
  url: string;
}

export interface AssessmentCardProps {
  readonly assesment: Assessment;
}

export interface StudentTabProps {
  readonly institutionId: string;
  readonly studentId: string;
  readonly caseStudy: StudentCaseStudy | null;
  readonly setCaseStudy: Dispatch<SetStateAction<StudentCaseStudy | null>>;
}
