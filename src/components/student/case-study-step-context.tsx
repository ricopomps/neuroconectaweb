"use client";

import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister } from "react-hook-form";

interface CaseStudyStepContextProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepContext({
  register,
  control,
}: CaseStudyStepContextProps) {
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
      <div className="space-y-2">
        <Label>Características do Autismo</Label>
        <CheckboxGroup
          control={control}
          name="autismCharacteristics"
          options={[
            {
              value: "repetitive_behaviors",
              label: "Comportamentos repetitivos",
            },
            {
              value: "sensory_sensitivities",
              label: "Sensibilidades sensoriais",
            },
            {
              value: "communication_difficulties",
              label: "Dificuldades de comunicação",
            },
            { value: "social_challenges", label: "Desafios sociais" },
            { value: "restricted_interests", label: "Interesses restritos" },
            { value: "other", label: "Outros" },
          ]}
          className="grid grid-cols-2 gap-2"
        />
      </div>
    </div>
  );
}
