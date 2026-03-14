"use client";

import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Label } from "@/components/ui/label";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister } from "react-hook-form";

interface CaseStudyStepCommunicationProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepCommunication({
  register,
  control,
}: CaseStudyStepCommunicationProps) {
  const COMMUNICATION_TYPES = [
    { value: "verbal", label: "Verbal" },
    { value: "gestural", label: "Gestual" },
    { value: "pictorial", label: "Pictórica" },
    { value: "alternative", label: "Alternativa" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Forma de comunicação</Label>
        <CheckboxGroup
          control={control}
          name="communicationTypes"
          options={COMMUNICATION_TYPES}
          className="grid grid-cols-2 gap-2"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="comprehensionLevel">Compreensão</Label>
        <select
          id="comprehensionLevel"
          {...register("comprehensionLevel")}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione</option>
          <option value="complex">Complexa</option>
          <option value="simple">Simples</option>
          <option value="low">Baixa</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="socialInteraction">Interação social</Label>
        <select
          id="socialInteraction"
          {...register("socialInteraction")}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione</option>
          <option value="plays_with_others">Brinca com outros</option>
          <option value="observes">Observa</option>
          <option value="isolates">Isola-se</option>
          <option value="aggressive">Agressivo</option>
        </select>
      </div>
    </div>
  );
}
