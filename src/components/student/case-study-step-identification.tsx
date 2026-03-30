"use client";

import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, Controller, UseFormRegister } from "react-hook-form";

function formatPhone(value: string) {
  const digits = value.replaceAll(/\D/g, "").slice(0, 11);
  const d1 = digits.slice(0, 2);
  const d2 = digits.slice(2, 7);
  const d3 = digits.slice(7, 11);

  let formatted = "";
  if (d1) {
    formatted += `(${d1}`;
    if (d1.length === 2) formatted += ") ";
  }
  if (d2) formatted += d2;
  if (d3) formatted += `-${d3}`;
  return formatted;
}

interface CaseStudyStepIdentificationProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepIdentification({
  register,
  control,
}: CaseStudyStepIdentificationProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schoolClass">Turma/Ano</Label>
          <Input id="schoolClass" {...register("schoolClass")} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="responsibleName">Tipo de responsável</Label>
          <select
            id="responsibleName"
            {...register("responsibleName")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione</option>
            <option value="médico">Médico</option>
            <option value="pai_responsável">Pai ou responsável</option>
            <option value="professor">Professor</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsiblePhone">Telefone</Label>
          <Controller
            control={control}
            name="responsiblePhone"
            render={({ field }) => (
              <Input
                id="responsiblePhone"
                value={field.value ?? ""}
                onChange={(event) =>
                  field.onChange(formatPhone(event.target.value))
                }
              />
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="responsibleEmail">Email</Label>
          <Input
            id="responsibleEmail"
            type="email"
            {...register("responsibleEmail")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="referredBy">Encaminhado por</Label>
          <select
            id="referredBy"
            {...register("referredBy")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione</option>
            <option value="teacher">Professor</option>
            <option value="family">Família</option>
            <option value="technical_team">Equipe Técnica</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name="hasDiagnosis"
          render={({ field }) => (
            <Checkbox
              id="hasDiagnosis"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="hasDiagnosis">Possui laudo</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnóstico</Label>
        <Input id="diagnosis" {...register("diagnosis")} />
      </div>
      <div className="space-y-2">
        <Label>Comorbidades</Label>
        <CheckboxGroup
          control={control}
          name="comorbidities"
          options={[
            { value: "tea", label: "TEA" },
            { value: "tod", label: "TOD" },
            { value: "tdah", label: "TDAH" },
            { value: "dislalia", label: "Dislalia" },
            { value: "other", label: "Outros" },
          ]}
          className="grid grid-cols-2 gap-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="informantName">Responsável pelas informações</Label>
          <Input id="informantName" {...register("informantName")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="informantRelation">Relação</Label>
          <select
            id="informantRelation"
            {...register("informantRelation")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione</option>
            <option value="médico">Médico</option>
            <option value="pai_responsável">Pai ou responsável</option>
            <option value="professor">Professor</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="informantPhone">Telefone</Label>
          <Controller
            control={control}
            name="informantPhone"
            render={({ field }) => (
              <Input
                id="informantPhone"
                value={field.value ?? ""}
                onChange={(event) =>
                  field.onChange(formatPhone(event.target.value))
                }
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="informantEmail">Email</Label>
          <Input
            id="informantEmail"
            type="email"
            {...register("informantEmail")}
          />
        </div>
      </div>
    </div>
  );
}
