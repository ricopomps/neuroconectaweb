"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister } from "react-hook-form";

interface CaseStudyStepContextProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepContext({ register }: CaseStudyStepContextProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="strengths">Pontos fortes</Label>
        <Textarea id="strengths" {...register("strengths")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="difficulties">Dificuldades</Label>
        <Textarea id="difficulties" {...register("difficulties")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentSupports">Apoios atuais</Label>
        <Textarea id="currentSupports" {...register("currentSupports")} />
      </div>
    </div>
  );
}
