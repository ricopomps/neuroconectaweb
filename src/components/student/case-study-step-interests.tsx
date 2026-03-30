"use client";

import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister } from "react-hook-form";

interface CaseStudyStepInterestsProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepInterests({
  register,
  control,
}: CaseStudyStepInterestsProps) {
  const INTERESTS = [
    { value: "music", label: "Música" },
    { value: "art", label: "Artes" },
    { value: "sports", label: "Esportes" },
    { value: "technology", label: "Tecnologia" },
    { value: "animals", label: "Animais" },
    { value: "others", label: "Outros" },
  ];

  const SENSORY_SENSITIVITIES = [
    { value: "light", label: "Luz" },
    { value: "sound", label: "Som" },
    { value: "touch", label: "Toque" },
    { value: "smell", label: "Cheiro" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Interesses</Label>
        <CheckboxGroup
          control={control}
          name="priorityAreas"
          options={INTERESTS}
          className="grid grid-cols-2 gap-2"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="specificInterest">Interesse específico</Label>
        <Input id="specificInterest" {...register("specificInterest")} />
      </div>
      <div className="space-y-2">
        <Label>Sensibilidade sensorial</Label>
        <CheckboxGroup
          control={control}
          name="sensorySensitivity"
          options={SENSORY_SENSITIVITIES}
          className="grid grid-cols-2 gap-2"
        />
      </div>
      <div className="space-y-2">
        <Label>Comportamento de crise</Label>
        <CheckboxGroup
          control={control}
          name="crisisBehaviors"
          options={[
            { value: "crying", label: "Chorar" },
            { value: "isolation", label: "Se isolar" },
            { value: "aggression", label: "Agressão" },
            { value: "other", label: "Outros" },
          ]}
          className="grid grid-cols-2 gap-2"
        />
      </div>
    </div>
  );
}
