"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AiAuditReportFiltersDto,
  AiFeature,
  AuditLog,
} from "@/lib/validation/audit-report";
import * as auditReportApi from "@/network/api/audit-report";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "../date-picker";
import { Input } from "../ui/input";
import { AuditLogList } from "./audit-log-list";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface AuditLogGridProps {
  readonly institutionId: string;
}

export function AuditLogGrid({ institutionId }: AuditLogGridProps) {
  const { register, control, handleSubmit } = useForm<AiAuditReportFiltersDto>(
    {},
  );

  const [tableData, setTableData] = useState<AuditLog[]>([]);
  const [totalTokenInputQty, setTotalTokenInputQty] = useState<number>(0);
  const [totalTokenOutputQty, setTotalTokenOutputQty] = useState<number>(0);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getReportData = (params: AiAuditReportFiltersDto) => {
    const size = 10;

    console.log(params);

    if (
      params?.dateUntil &&
      params?.dateFrom &&
      params.dateUntil < params.dateFrom
    ) {
      toast.warning("A data final não deve ser maior do que a data inicial");
      return;
    }

    setIsSubmitting(true);
    auditReportApi
      .getAuditReportData(params, 1, size)
      .then((response) => {
        setTableData(response.data);
        setTotalTokenInputQty(response.totalTokenInputQty);
        setTotalTokenOutputQty(response.totalTokenOutputQty);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="bg-muted sm:px-6 lg:px-8 w-full">
      <div className="flex items-center justify-between px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Usuário</Label>
          <Input id="name-1" className="w-64" {...register("userName")} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="model-1">Modelo</Label>
          <Input id="model-1" className="w-64" {...register("model")} />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="ai-provider-1">Provedor da IA</Label>
          <Controller
            control={control}
            name="aiProvider"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="OpenAi">OpenAi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="feature-1">Funcionalidade</Label>
          <Controller
            control={control}
            name="feature"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={AiFeature.GENERATE_PAEE}>
                      Gerar PAEE
                    </SelectItem>
                    <SelectItem value={AiFeature.SUMMARIZE_TEXT}>
                      Resumir Documentos
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid gap-3">
          <DatePicker<AiAuditReportFiltersDto>
            name="dateFrom"
            control={control}
            label="Data Início"
            maxDate={new Date()}
            showMonthYearDropdown
            className="w-64"
          />
        </div>
        <div className="grid gap-3">
          <DatePicker<AiAuditReportFiltersDto>
            name="dateUntil"
            control={control}
            label="Data Fim"
            maxDate={new Date()}
            showMonthYearDropdown
            className="w-64"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <b>
          Total tokens de entrada: {totalTokenInputQty}, Total tokens de saída:{" "}
          {totalTokenOutputQty}
        </b>
        <Button onClick={handleSubmit(getReportData)} disabled={isSubmitting}>
          {isSubmitting ? "Buscando..." : "Buscar"}
        </Button>
      </div>
      {isSubmitting ? <Spinner /> : <AuditLogList tableData={tableData} />}
    </div>
  );
}
