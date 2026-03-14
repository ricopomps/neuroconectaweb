import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ClipboardList, FileText } from "lucide-react";
import { AssessmentsTab } from "./assessments-tab";
import { DocumentsTab } from "./documents-tab";
import { StudentCaseStudyForm } from "./student-case-study-form";

interface StudentTabsProps {
  readonly institutionId: string;
  readonly studentId: string;
}

export function StudentTabs({ institutionId, studentId }: StudentTabsProps) {
  return (
    <Tabs defaultValue="assessments" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-background">
        <TabsTrigger value="assessments" className="gap-2">
          <ClipboardList className="h-4 w-4" />
          Avaliações
        </TabsTrigger>
        <TabsTrigger value="documents" className="gap-2">
          <FileText className="h-4 w-4" />
          Documentos
        </TabsTrigger>
        <TabsTrigger value="case-study" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Estudo de Caso
        </TabsTrigger>
      </TabsList>

      <TabsContent value="assessments" className="space-y-4">
        <AssessmentsTab institutionId={institutionId} studentId={studentId} />
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <DocumentsTab institutionId={institutionId} studentId={studentId} />
      </TabsContent>

      <TabsContent value="case-study" className="space-y-4">
        <StudentCaseStudyForm
          institutionId={institutionId}
          studentId={studentId}
        />
      </TabsContent>
    </Tabs>
  );
}
