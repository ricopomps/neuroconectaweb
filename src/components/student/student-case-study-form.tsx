"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface StudentCaseStudyFormProps {
  readonly institutionId: string;
  readonly studentId: string;
}

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
}: StudentCaseStudyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [caseStudy, setCaseStudy] = useState<StudentCaseStudy | null>(null);

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
  }, [institutionId, studentId, reset]);

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

  const progress = ((currentStep + 1) / steps.length) * 100;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
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
