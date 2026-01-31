"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudentFile } from "@/lib/validation/student";
import * as studentApi from "@/network/api/student";
import { File, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DocumentsTabProps {
  readonly institutionId: string;
  readonly studentId: string;
}

export function DocumentsTab({ institutionId, studentId }: DocumentsTabProps) {
  const [documents, setDocuments] = useState<StudentFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await studentApi.getFiles(institutionId, studentId);
        setDocuments(response.files);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setDocuments([]);
      }
    }
    fetchDocuments();
  }, [studentId, institutionId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", `students/${studentId}/documents/${file.name}`);
      formData.append("studentId", studentId);
      formData.append("institutionId", institutionId);
      const token = localStorage.getItem("authToken");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      console.log(result);
      if (result.error) {
        toast.error(`Erro ao enviar arquivo: ${result.error}`);
        return;
      }
      setDocuments([result, ...documents]);

      toast.success(`Arquivo "${file.name}" enviado com sucesso!`);
    } catch (e) {
      console.error("Error uploading file:", e);
      toast.error("Erro ao enviar arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast.success("Documento removido com sucesso");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full ">
        <label className="bg-background/50 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer  hover:bg-muted transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {/* <button
              onClick={() =>
                console.log(
                  getDownloadUrl(
                    "https://zbvvhfsrspdrcrh8.public.blob.vercel-storage.com/students/1/documents/certificate.pdf",
                  ),
                )
              }
            >
              hi
            </button> */}
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Clique para enviar</span> ou
              arraste um arquivo
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX, XLS, XLSX (até 10 MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
        </label>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Documentos Enviados</h3>
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum documento enviado ainda
          </p>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
