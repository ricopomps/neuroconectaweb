"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StudentTabProps } from "@/lib/validation/assessments";
import { StudentCaseStudy } from "@/lib/validation/student";
import * as caseStudyApi from "@/network/api/case-study";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CaseStudyStepAutonomy } from "./case-study-step-autonomy";
import { CaseStudyStepCommunication } from "./case-study-step-communication";
import { CaseStudyStepContext } from "./case-study-step-context";
import { CaseStudyStepHealth } from "./case-study-step-health";
import { CaseStudyStepIdentification } from "./case-study-step-identification";
import { CaseStudyStepInterests } from "./case-study-step-interests";
import { CaseStudyStepPedagogical } from "./case-study-step-pedagogical";
import { CaseStudyStepSynthesis } from "./case-study-step-synthesis";

const steps = [
  { title: "Identificação", component: CaseStudyStepIdentification },
  { title: "Anamnese e Saúde", component: CaseStudyStepHealth },
  { title: "Autonomia", component: CaseStudyStepAutonomy },
  { title: "Comunicação", component: CaseStudyStepCommunication },
  { title: "Interesses e Sensorial", component: CaseStudyStepInterests },
  { title: "Avaliação Pedagógica", component: CaseStudyStepPedagogical },
  { title: "Contexto Escolar", component: CaseStudyStepContext },
  { title: "Síntese PAEE", component: CaseStudyStepSynthesis },
];

export function StudentCaseStudyForm({
  institutionId,
  studentId,
  caseStudy,
  setCaseStudy,
}: StudentTabProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<StudentCaseStudy>({
    defaultValues: {
      hasDiagnosis: false,
      usesMedication: false,
      medicationAtSchool: false,
      foodSelectivity: false,
      responsiblePhone: "",
      informantPhone: "",
    },
  });

  useEffect(() => {
    async function fetchCaseStudy() {
      try {
        const data = await caseStudyApi.getCaseStudy(institutionId, studentId);
        setCaseStudy(data);
        reset(data);
      } catch {
        // If not found, assume new
        console.log("No existing case study");
      }
    }
    fetchCaseStudy();
  }, [institutionId, studentId, reset, setCaseStudy]);

  const onSubmit = async (data: StudentCaseStudy) => {
    try {
      if (caseStudy) {
        await caseStudyApi.updateCaseStudy(institutionId, studentId, data);
        toast.success("Estudo de caso atualizado com sucesso!");
      } else {
        const newCaseStudy = await caseStudyApi.createCaseStudy(
          institutionId,
          studentId,
          data,
        );
        toast.success("Estudo de caso criado com sucesso!");
        setCaseStudy(newCaseStudy);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao salvar");
      }
    }
  };

  const submitForm = handleSubmit(onSubmit);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getButtonClass = (index: number) => {
    const base =
      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors";
    if (index === currentStep) return `${base} bg-green-600 text-white`;
    if (index < currentStep) return `${base} bg-blue-600 text-white`;
    return `${base} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <div className="flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={getButtonClass(index)}
                  >
                    {index + 1}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{step.title}</TooltipContent>
              </Tooltip>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    index < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <CurrentStepComponent control={control} register={register} />
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button
                type="button"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            ) : (
              <Button type="button" onClick={nextStep}>
                Próximo
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
