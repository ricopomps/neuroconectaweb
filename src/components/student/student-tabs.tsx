import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, FileText } from "lucide-react";
import { AssessmentsTab } from "./assessments-tab";
import { DocumentsTab } from "./documents-tab";

interface StudentTabsProps {
  readonly institutionId: string;
  readonly studentId: string;
}

export function StudentTabs({ institutionId, studentId }: StudentTabsProps) {
  return (
    <Tabs defaultValue="assessments" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-background">
        <TabsTrigger value="assessments" className="gap-2">
          <ClipboardList className="h-4 w-4" />
          Avaliações
        </TabsTrigger>
        <TabsTrigger value="documents" className="gap-2">
          <FileText className="h-4 w-4" />
          Documentos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="assessments" className="space-y-4">
        <AssessmentsTab />
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <DocumentsTab institutionId={institutionId} studentId={studentId} />
      </TabsContent>
    </Tabs>
  );
}
