"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Assessment {
  id: string;
  name: string;
  date: string;
  status: "completed" | "pending" | "in-progress";
  score?: number;
}

// Mocked assessments data
const mockedAssessments: Assessment[] = [
  {
    id: "1",
    name: "Avaliação Inicial",
    date: "2024-01-15",
    status: "completed",
    score: 85,
  },
  {
    id: "2",
    name: "Teste de Progresso",
    date: "2024-02-20",
    status: "completed",
    score: 92,
  },
  {
    id: "3",
    name: "Avaliação Intermediária",
    date: "2024-03-10",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Teste Final",
    date: "2024-04-30",
    status: "pending",
  },
];

const statusMap = {
  completed: { label: "Concluída", color: "bg-green-500" },
  "in-progress": { label: "Em Progresso", color: "bg-blue-500" },
  pending: { label: "Pendente", color: "bg-yellow-500" },
};

export function AssessmentsTab() {
  return (
    <div className="space-y-4">
      {mockedAssessments.map((assessment) => (
        <Card key={assessment.id}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-semibold">{assessment.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(assessment.date).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {assessment.score !== undefined && (
                  <div className="text-right">
                    <p className="text-2xl font-bold">{assessment.score}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                )}
                <Badge className={statusMap[assessment.status].color}>
                  {statusMap[assessment.status].label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
