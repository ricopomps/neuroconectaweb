"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppRoutes, buildRoute } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import { Student } from "@/lib/validation/student";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

interface StudentListProps {
  readonly students: Student[];
}
export function StudentList({ students }: StudentListProps) {
  const tableHeaders = ["Aluno", "Data de nascimento", "Ações"];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header, index) => (
            <TableHead
              key={header}
              className={index === tableHeaders.length - 1 ? "text-right" : ""}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <StudentTableRow key={student.id} student={student} />
        ))}
      </TableBody>
    </Table>
  );
}
interface StudentTableRowProps {
  readonly student: Student;
}

function StudentTableRow({ student }: StudentTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{student.name}</TableCell>
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
