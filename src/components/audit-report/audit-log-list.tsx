"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLog } from "@/lib/validation/audit-report";
import moment from "moment";

interface AuditLogListProps {
  readonly tableData: AuditLog[];
}

export function AuditLogList({ tableData }: AuditLogListProps) {
  return (
    <Table>
      {tableData.length === 0 && (
        <TableCaption>Não há dados para o filtro selecionado</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Provedor IA</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Data e Hora</TableHead>
          <TableHead>Funcionalidade</TableHead>
          <TableHead>Usuário</TableHead>
          <TableHead>Qtde Tokens de Entrada</TableHead>
          <TableHead>Qtde Tokens de Saída</TableHead>
          <TableHead>Qtde Imagens</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.aiProvider}</TableCell>
            <TableCell>{log.model}</TableCell>
            <TableCell>
              {moment(log.createdAt).format("DD/MM/YYYY HH:mm")}
            </TableCell>
            <TableCell>{log.feature}</TableCell>
            <TableCell>{log.user?.name}</TableCell>
            <TableCell>{log.tokenInputQty}</TableCell>
            <TableCell>{log.tokenOutputQty}</TableCell>
            <TableCell>{log.imagesQty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
