"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AssessmentWithUrl, DocumentsTabProps } from "@/lib/validation/assessments";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import * as studentApi from "@/network/api/student";
import * as assessmentApi from "@/network/api/assessment";
import { StudentFile } from "@/lib/validation/student";
import Markdown from "react-markdown";
import { toast } from "sonner";

export function AssessmentsTab({
  institutionId,
  studentId,
}: DocumentsTabProps) {
  const [openForm, setOpenForm] = useState(false);
  const [documents, setDocuments] = useState<StudentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [generatedDoc, setGeneratedDoc] = useState("");
  const [assessmentsDone, setAssessmentsDone] = useState<AssessmentWithUrl[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("");

  const [url, setUrl] = useState("");

  const setStudentFiles = (files: StudentFile[]) => {
    setDocuments(files);
  };

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await studentApi.getFiles(institutionId, studentId);
        setStudentFiles(response.files);
        const assessments = await assessmentApi.getAssessments(studentId);
        setAssessmentsDone(assessments);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setStudentFiles([]);
      }
    }
    fetchDocuments();
  }, [studentId, institutionId]);

  const sendFilesToAI = () => {
    // setIsSubmitting(true);
    assessmentApi
      .generateDoc(documents)
      .then((response) => {
        setGeneratedDoc(response);
      })
      .catch((error) => {
        toast.error("Erro ao gerar documento");
      })
      .finally(() => {
        // setIsSubmitting(false);
      });
  };

  const saveAssessment = () => {
    // setIsSubmitting(true);
    if (selectedAssessmentId) {
      assessmentApi
        .updateAssessment(generatedDoc, selectedAssessmentId)
        .then((response) => {
          setUrl(response);
          toast.success("Avaliação atualizada!");
        })
        .catch(() => {
          toast.error("Erro ao atualizar avaliação");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      const assessmentName = `Avaliação ${assessmentsDone.length + 1}`;
      assessmentApi
        .createAssessment(assessmentName, generatedDoc, studentId)
        .then((response) => {
          setUrl(response);
          toast.success("Avaliação salva!", {
            description: `Registrada como ${assessmentName}`,
          });
        })
        .catch(() => {
          toast.error("Erro ao salvar avaliação");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const editAssessment = (assessment: AssessmentWithUrl) => {
    setGeneratedDoc(assessment.content);
    setUrl(assessment.url)
    setSelectedAssessmentId(assessment.id);
    setOpenForm(true);
  };

  if (!openForm) {
    return (
      <div className="space-y-4">
        <Card style={{ cursor: "pointer" }} onClick={() => setOpenForm(true)}>
          <CardContent>
            <div className="items-center">
              <p className="font-semibold">
                <PlusIcon />
              </p>
            </div>
          </CardContent>
        </Card>
        {assessmentsDone.map((assessment) => (
          <Card
            key={assessment.id}
            style={{ cursor: "pointer" }}
            onClick={() => editAssessment(assessment)}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-semibold">{assessment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(assessment.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return generatedDoc ? (
    <Card>
      <CardContent>
        <Card>
          <CardContent>
            <Markdown>{generatedDoc}</Markdown>
          </CardContent>
        </Card>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setGeneratedDoc("");
            setOpenForm(false);
          }}
          disabled={isSubmitting}
        >
          Voltar
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.open(url)}
          disabled={isSubmitting}
        >
          Baixar
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={() => console.log(url)}
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </CardContent>
    </Card>
  ) : (
    <div className="space-y-4">
      <Label htmlFor="name">Selecione os arquivos para a avaliação:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <FieldGroup className="max-w-sm">
            {documents.map((doc) => (
              <Field key={doc.name} orientation="horizontal">
                <Checkbox id="terms-checkbox" name="terms-checkbox" />
                <Label htmlFor="terms-checkbox">{doc.name}</Label>
              </Field>
            ))}
          </FieldGroup>
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpenForm(false)}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button onClick={() => sendFilesToAI()} disabled={isSubmitting}>
          {isSubmitting ? "Gerando..." : "Gerar nova avaliação"}
        </Button>
      </div>
    </div>
  );
}
