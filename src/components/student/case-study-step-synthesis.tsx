"use client";

import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister } from "react-hook-form";

interface CaseStudyStepSynthesisProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepSynthesis({
  register,
  control,
}: CaseStudyStepSynthesisProps) {
  const PRIORITY_AREAS = [
    { value: "cognitive", label: "Cognitivo" },
    { value: "motor", label: "Motor" },
    { value: "communication", label: "Comunicação" },
    { value: "social", label: "Social" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="aeeOpinion">Parecer do AEE</Label>
        <Textarea id="aeeOpinion" {...register("aeeOpinion")} />
      </div>
      <div className="space-y-2">
        <Label>Áreas prioritárias</Label>
        <CheckboxGroup
          control={control}
          name="priorityAreas"
          options={PRIORITY_AREAS}
          className="grid grid-cols-2 gap-2"
        />
        {/* <Label>Áreas prioritárias</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cognitive"
              value="cognitive"
              {...register("priorityAreas")}
            />
            <Label htmlFor="cognitive">Cognitivo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="motor" value="motor" {...register("priorityAreas")} />
            <Label htmlFor="motor">Motor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="communication"
              value="communication"
              {...register("priorityAreas")}
            />
            <Label htmlFor="communication">Comunicação</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="social"
              value="social"
              {...register("priorityAreas")}
            />
            <Label htmlFor="social">Social</Label>
          </div>
        </div> */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="suggestedAdaptations">Adaptações sugeridas</Label>
        <Textarea
          id="suggestedAdaptations"
          {...register("suggestedAdaptations")}
        />
      </div>
    </div>
  );
}
