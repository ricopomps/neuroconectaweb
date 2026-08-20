"use client";

import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister, useWatch } from "react-hook-form";

interface CaseStudyStepContextProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

const neurodivergentOptions = [
  { value: "repetitive_behaviors", label: "Comportamentos repetitivos" },
  { value: "sensory_sensitivities", label: "Sensibilidades sensoriais" },
  { value: "communication_difficulties", label: "Dificuldades de comunicação" },
  { value: "social_challenges", label: "Desafios sociais" },
  { value: "restricted_interests", label: "Interesses restritos" },
  { value: "emotional_dysregulation", label: "Desregulação emocional" },
  { value: "intellectual_disability", label: "Deficiência intelectual" },
  { value: "ecolalia", label: "Ecolalia" },
  { value: "other", label: "Outros" },
];

export function CaseStudyStepContext({
  register,
  control,
}: CaseStudyStepContextProps) {
  const selectedCharacteristics =
    useWatch({ control, name: "neurodivergentCharacteristics" }) ?? [];
  const neurodivergentObservations =
    useWatch({ control, name: "neurodivergentObservations" }) ?? {};

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
        <Label>Características Neurodivergentes</Label>
        <CheckboxGroup
          control={control}
          name="neurodivergentCharacteristics"
          options={neurodivergentOptions}
          className="grid grid-cols-2 gap-2"
        />

        {selectedCharacteristics.length > 0 && (
          <div className="mt-4 space-y-3 rounded-md border bg-muted/30 p-3">
            {neurodivergentOptions
              .filter((option) =>
                selectedCharacteristics.includes(option.value),
              )
              .map((option) => (
                <div key={option.value} className="space-y-2">
                  <Label htmlFor={`neurodivergent-observation-${option.value}`}>
                    Observações sobre: {option.label}
                  </Label>
                  <Input
                    id={`neurodivergent-observation-${option.value}`}
                    {...register(
                      `neurodivergentObservations.${option.value}` as const,
                    )}
                    defaultValue={
                      neurodivergentObservations?.[option.value] ?? ""
                    }
                    placeholder="Descreva o comportamento ou observação"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
