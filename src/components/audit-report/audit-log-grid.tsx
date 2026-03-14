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
  AiProviders,
  AuditLog,
} from "@/lib/validation/audit-report";
import * as auditReportApi from "@/network/api/audit-report";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "../date-picker";
import { Input } from "../ui/input";
import { AuditLogList } from "./audit-log-list";

interface AuditLogGridProps {
  readonly institutionId: string;
}

export function AuditLogGrid({ institutionId }: AuditLogGridProps) {
  const initialValues = {
    aiProvider: AiProviders.OPEN_AI,
    model: "4.0",
    dateFrom: undefined,
    dateUntil: undefined,
    userName: "",
    feature: undefined,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AiAuditReportFiltersDto>({});

  const [tableData, setTableData] = useState<AuditLog[]>([]);

  const getReportData = (params: AiAuditReportFiltersDto) => {
    const size = 10;

    auditReportApi.getAuditReportData(params, 1, size).then((response) => {
      setTableData(response.data);
    });
  };

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <form onSubmit={handleSubmit(getReportData)}>
        <div className="bg-muted row min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Usuário</Label>
            <Input id="name-1" {...register("userName")} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="model-1">Modelo</Label>
            <Input id="model-1" {...register("model")} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="ai-provider-1">Provedor da IA</Label>
            <Select {...register("aiProvider")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="OpenAi">OpenAi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="feature-1">Funcionalidade</Label>
            <Select {...register("feature")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Google">Gerar PAEE</SelectItem>
                  <SelectItem value="OpenAi">Resumir Documentos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3 mb-4">
            <DatePicker<AiAuditReportFiltersDto>
              name="dateFrom"
              control={control}
              label="Data Início"
              maxDate={new Date()}
              showMonthYearDropdown
            />
          </div>
          <div className="grid gap-3 mb-4">
            <DatePicker<AiAuditReportFiltersDto>
              name="dateUntil"
              control={control}
              label="Data Fim"
              maxDate={new Date()}
              showMonthYearDropdown
            />
          </div>
          <div className="text-right mb-4">
            <Button type="submit">Buscar</Button>
          </div>
          <AuditLogList tableData={tableData} />
        </div>
      </form>
    </div>
  );
}
