"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppRoutes, buildRoute } from "@/lib/routes";
import { STUDENT_SEGMENT_OPTIONS } from "@/lib/student-segments";
import { formatDate } from "@/lib/utils";
import { Student } from "@/lib/validation/student";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface StudentListProps {
  readonly students: Student[];
}
export function StudentList({ students }: StudentListProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("");

  const filteredStudents = useMemo(() => {
    const normalizedName = nameFilter.trim().toLowerCase();
    const normalizedSegment = segmentFilter.trim().toLowerCase();

    return students.filter((student) => {
      const matchesName =
        !normalizedName || student.name.toLowerCase().includes(normalizedName);
      const matchesSegment =
        !normalizedSegment ||
        (student.segment ?? "").toLowerCase().includes(normalizedSegment);

      return matchesName && matchesSegment;
    });
  }, [nameFilter, segmentFilter, students]);

  const tableHeaders = ["Aluno", "Segmento", "Data de nascimento", "Ações"];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
          placeholder="Filtrar por nome"
        />
        <select
          value={segmentFilter}
          onChange={(event) => setSegmentFilter(event.target.value)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Todos os segmentos</option>
          {STUDENT_SEGMENT_OPTIONS.map((segment) => (
            <option key={segment} value={segment}>
              {segment}
            </option>
          ))}
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHead
                key={header}
                className={
                  index === tableHeaders.length - 1 ? "text-right" : ""
                }
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhum aluno encontrado com os filtros aplicados.
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student) => (
              <StudentTableRow key={student.id} student={student} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
interface StudentTableRowProps {
  readonly student: Student;
}

function StudentTableRow({ student }: StudentTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{student.name}</TableCell>
      <TableCell>{student.segment || "Não informado"}</TableCell>
      <TableCell>{formatDate(student.birthDate)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link
              href={buildRoute(AppRoutes.STUDENT_PAGE, {
                institutionId: student.institutionId,
                studentId: student.id,
              })}
            >
              <DropdownMenuItem>Visualizar</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Deletar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
