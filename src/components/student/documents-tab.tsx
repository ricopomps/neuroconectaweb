"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { File, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
  size: string;
}

// Mocked documents data
const mockedDocuments: Document[] = [
  {
    id: "1",
    name: "Histórico Escolar",
    uploadedAt: "2024-01-10",
    size: "2.5 MB",
  },
  {
    id: "2",
    name: "Relatório de Avaliação",
    uploadedAt: "2024-02-15",
    size: "1.2 MB",
  },
  {
    id: "3",
    name: "Certificado de Participação",
    uploadedAt: "2024-03-05",
    size: "0.8 MB",
  },
];

export function DocumentsTab() {
  const [documents, setDocuments] = useState<Document[]>(mockedDocuments);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const file = files[0];
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        uploadedAt: new Date().toISOString().split("T")[0],
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      };

      setDocuments([newDocument, ...documents]);
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
                        {doc.size} •{" "}
                        {new Date(doc.uploadedAt).toLocaleDateString("pt-BR")}
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
