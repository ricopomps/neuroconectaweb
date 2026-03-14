"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import * as auditReportApi from "@/network/api/audit-report";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AiAuditReportFiltersDto,
  AiProviders,
  AuditLog,
} from "@/lib/validation/audit-report";

export default function Page() {
  const initialValues = {
    aiProvider: AiProviders.OPEN_AI,
    model: "4.0",
    dateFrom: undefined,
    dateUntil: undefined,
    userId: "",
    feature: undefined,
  };

  const [formState, setFormState] =
    useState<AiAuditReportFiltersDto>(initialValues);
  const [tableData, setTableData] = useState<AuditLog[]>([]);

  const getReportData = (page = 1) => {
    const size = 10;

    auditReportApi
      .getAuditReportData(formState, page, size)
      .then((response) => {
        setTableData(response.data);
      });
  };

  useEffect(() => {
    getReportData();
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Table>
          <TableCaption>Não há dados para o filtro selecionado</TableCaption>
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
      </div>
    </div>
  );
}
