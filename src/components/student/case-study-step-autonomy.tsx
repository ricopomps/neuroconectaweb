"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, Controller, UseFormRegister } from "react-hook-form";

interface CaseStudyStepAutonomyProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepAutonomy({
  register,
  control,
}: CaseStudyStepAutonomyProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="feeding">Alimentação</Label>
          <select
            id="feeding"
            {...register("feeding")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="independent">Independente</option>
            <option value="needs_supervision">Precisa supervisão</option>
            <option value="needs_help">Precisa ajuda</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="foodSelectivity"
            render={({ field }) => (
              <Checkbox
                id="foodSelectivity"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="foodSelectivity">Seletividade alimentar</Label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="foodRestrictions">Restrições alimentares</Label>
        <Input id="foodRestrictions" {...register("foodRestrictions")} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bathroomIndependence">Banheiro</Label>
          <select
            id="bathroomIndependence"
            {...register("bathroomIndependence")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="independent">Independente</option>
            <option value="needs_help">Precisa ajuda</option>
            <option value="full_help">Ajuda total</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dressing">Vestir-se</Label>
          <select
            id="dressing"
            {...register("dressing")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="independent">Independente</option>
            <option value="needs_help">Precisa ajuda</option>
            <option value="dependent">Dependente</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="locomotion">Locomoção</Label>
        <select
          id="locomotion"
          {...register("locomotion")}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione</option>
          <option value="independent">Independente</option>
          <option value="unstable">Instável</option>
          <option value="wheelchair">Cadeira de rodas</option>
        </select>
      </div>
    </div>
  );
}
