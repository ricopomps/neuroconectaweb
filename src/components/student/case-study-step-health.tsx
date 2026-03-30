"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, Controller, UseFormRegister } from "react-hook-form";

interface CaseStudyStepHealthProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepHealth({
  register,
  control,
}: CaseStudyStepHealthProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="pregnancyHistory">Histórico gestacional</Label>
        <select
          id="pregnancyHistory"
          {...register("pregnancyHistory")}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione</option>
          <option value="normal">Normal</option>
          <option value="complicated">Complicado</option>
          <option value="premature">Prematuro</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="walkingDevelopment">Andar</Label>
          <select
            id="walkingDevelopment"
            {...register("walkingDevelopment")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="até_1_ano">Até 1 ano</option>
            <option value="entre_1_2">Entre 1 e 2 anos</option>
            <option value="acima_2">Acima de 2 anos</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="speechDevelopment">Falar</Label>
          <select
            id="speechDevelopment"
            {...register("speechDevelopment")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="até_1_ano">Até 1 ano</option>
            <option value="entre_1_2">Entre 1 e 2 anos</option>
            <option value="acima_2">Acima de 2 anos</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sphincterControl">Controle de esfíncteres</Label>
          <select
            id="sphincterControl"
            {...register("sphincterControl")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="full">Completo</option>
            <option value="day_only">Apenas diurno</option>
            <option value="diapers">Fraldas</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vision">Visão</Label>
          <select
            id="vision"
            {...register("vision")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="normal">Normal</option>
            <option value="glasses">Óculos</option>
            <option value="low_vision">Baixa visão</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hearing">Audição</Label>
          <select
            id="hearing"
            {...register("hearing")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="normal">Normal</option>
            <option value="hearing_loss">Perda auditiva</option>
            <option value="hearing_device">Aparelho</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sleep">Sono</Label>
          <select
            id="sleep"
            {...register("sleep")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="normal">Normal</option>
            <option value="agitated">Agitado</option>
            <option value="insomnia">Insônia</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name="usesMedication"
          render={({ field }) => (
            <Checkbox
              id="usesMedication"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="usesMedication">Usa medicação</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="medicationName">Nome da medicação</Label>
          <Input id="medicationName" {...register("medicationName")} />
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="medicationAtSchool"
            render={({ field }) => (
              <Checkbox
                id="medicationAtSchool"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="medicationAtSchool">Medicação na escola</Label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="developmentMilestones">Desenvolvimento</Label>
        <Textarea
          id="developmentMilestones"
          {...register("developmentMilestones")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="healthHistory">Saúde geral</Label>
        <Textarea id="healthHistory" {...register("healthHistory")} />
      </div>
    </div>
  );
}
