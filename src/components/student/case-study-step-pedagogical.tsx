"use client";

import { Label } from "@/components/ui/label";
import { StudentCaseStudy } from "@/lib/validation/student";
import { Control, UseFormRegister } from "react-hook-form";

interface CaseStudyStepPedagogicalProps {
  readonly control: Control<StudentCaseStudy>;
  readonly register: UseFormRegister<StudentCaseStudy>;
}

export function CaseStudyStepPedagogical({
  register,
}: CaseStudyStepPedagogicalProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="attention">Atenção</Label>
          <select
            id="attention"
            {...register("attention")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="focused">Focada</option>
            <option value="dispersed">Dispersa</option>
            <option value="hyperfocus">Hiperfoco</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="frustrationTolerance">Tolerância à frustração</Label>
          <select
            id="frustrationTolerance"
            {...register("frustrationTolerance")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="asks_help">Pede ajuda</option>
            <option value="withdraws">Se recolher</option>
            <option value="meltdown">Colapso</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="commandUnderstanding">Compreensão de comandos</Label>
          <select
            id="commandUnderstanding"
            {...register("commandUnderstanding")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="complex">Complexos</option>
            <option value="simple">Simples</option>
            <option value="visual_support">Suporte visual</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="spatialConcepts">Noção espacial</Label>
          <select
            id="spatialConcepts"
            {...register("spatialConcepts")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="developing">Em desenvolvimento</option>
            <option value="acquired">Adquirida</option>
            <option value="difficulties">Com dificuldades</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="developmentStage">Fase de desenvolvimento</Label>
          <select
            id="developmentStage"
            {...register("developmentStage")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione</option>
            <option value="pre_operational">Pré-operatório</option>
            <option value="concrete_operational">Operatório-concreto</option>
            <option value="formal_operational">Operatório-formal</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="readingLevel">Nível de leitura</Label>
          <select
            id="readingLevel"
            {...register("readingLevel")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="syllabic">Silábico</option>
            <option value="syllabic_alphabetic">Silábico-alfabético</option>
            <option value="alphabetic">Alfabético</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mathReasoning">Raciocínio matemático</Label>
          <select
            id="mathReasoning"
            {...register("mathReasoning")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="mechanical_count">Contagem mecânica</option>
            <option value="number_quantity_relation">
              Relação número-quantidade
            </option>
            <option value="basic_operations">Operações básicas</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="learningStyle">Estilo de aprendizagem</Label>
          <select
            id="learningStyle"
            {...register("learningStyle")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="visual">Visual</option>
            <option value="auditory">Auditivo</option>
            <option value="kinesthetic">Cinestésico</option>
            <option value="text_reading">Leitura de texto</option>
          </select>
        </div>
      </div>
    </div>
  );
}
