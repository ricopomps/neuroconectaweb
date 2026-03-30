"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AssessmentWithUrl,
  StudentTabProps,
} from "@/lib/validation/assessments";
import { StudentFile } from "@/lib/validation/student";
import * as assessmentApi from "@/network/api/assessment";
import * as studentApi from "@/network/api/student";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AssessmentsTab({
  institutionId,
  studentId,
  caseStudy,
}: StudentTabProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  });

  const [openForm, setOpenForm] = useState(false);
  const [documents, setDocuments] = useState<StudentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [generatedDoc, setGeneratedDoc] = useState<string>("");
  const [assessmentsDone, setAssessmentsDone] = useState<AssessmentWithUrl[]>(
    [],
  );
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("");
  const [nameForAssessment, setNameForAssessment] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const setStudentFiles = (files: StudentFile[]) => {
    setDocuments(files);
  };

  const getAssessments = async () => {
    const assessments = await assessmentApi.getAssessments(studentId);
    setAssessmentsDone(assessments);
  };

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await studentApi.getFiles(institutionId, studentId);
        setStudentFiles(response.files);
        await getAssessments();
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setStudentFiles([]);
      }
    }
    fetchDocuments();
  }, [studentId, institutionId]);

  const validateStudentCaseStudy = () => {
    return !!caseStudy;
  };

  const sendFilesToAI = () => {
    const isValid = validateStudentCaseStudy();
    if (!isValid) {
      toast.warning(
        "É necessário finalizar antes o Estudo de Caso desse aluno",
      );
      return;
    }

    setIsSubmitting(true);
    assessmentApi
      .generateDoc(studentId, documents)
      .then((response) => {
        setEditableContent(response);
        setGeneratedDoc(response);
      })
      .catch(() => {
        toast.error("Erro ao gerar documento");
      })
      .finally(() => {
        setIsSubmitting(false);
        getAssessments();
      });
  };

  const dataSaved = () => {
    setGeneratedDoc("");
    setOpenForm(false);
    setOpen(false);
    setIsSubmitting(false);
    getAssessments();
  };

  const saveNewAssessment = () => {
    assessmentApi
      .createAssessment(nameForAssessment, generatedDoc, studentId)
      .then((response) => {
        setUrl(response);
        toast.success("Avaliação salva!", {
          description: `Registrada como ${nameForAssessment}`,
        });
      })
      .catch(() => {
        toast.error("Erro ao salvar avaliação");
      })
      .finally(() => {
        dataSaved();
      });
  };

  const updateAssessment = () => {
    if (!editor) {
      toast.error("Erro ao processar alteração");
      return;
    }
    const unchangedDoc = isUnchangedHtml();
    if (unchangedDoc) {
      toast.warning("Não foram feitas mudanças no documento");
      return;
    }
    setIsSubmitting(true);
    const content = editor.getHTML();
    assessmentApi
      .updateAssessment(content, selectedAssessmentId)
      .then((response) => {
        setUrl(response);
        toast.success("Avaliação atualizada!");
      })
      .catch(() => {
        toast.error("Erro ao atualizar avaliação");
      })
      .finally(() => {
        dataSaved();
      });
  };

  const editAssessment = (assessment: AssessmentWithUrl) => {
    setEditableContent(assessment.content);
    setGeneratedDoc(assessment.content);
    setUrl(assessment.url);
    setSelectedAssessmentId(assessment.id);
    setOpenForm(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setNameForAssessment(event.target.value);
  };

  const setEditableContent = (content: string) => {
    if (editor) {
      editor.commands.setContent(content);
    }
  };

  const isUnchangedHtml = () => {
    if (!editor) {
      return false;
    }
    const content = editor.getHTML();
    return content === generatedDoc;
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
            <EditorContent editor={editor} />
          </CardContent>
        </Card>
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
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
          </div>
          <Button
            type="button"
            variant="default"
            onClick={() =>
              selectedAssessmentId ? updateAssessment() : setOpen(true)
            }
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </div>
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Criar Avaliação</DialogTitle>
            <DialogDescription>
              Defina um nome para a avaliação a ser salva
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Nome</Label>
              <Input
                id="name-1"
                name="name"
                value={nameForAssessment}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={() => saveNewAssessment()}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  ) : (
    <div className="space-y-4">
      <Label htmlFor="name">Selecione os arquivos para a avaliação:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <FieldGroup className="max-w-sm">
            <Field key="Estudo de Caso" orientation="horizontal">
              <Checkbox
                id="stdt-case"
                name="terms-checkbox"
                disabled
                defaultChecked
              />
              <Label htmlFor="stdt-case">Estudo de Caso</Label>
            </Field>
            {documents.map((doc) => (
              <Field key={doc.id} orientation="horizontal">
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
