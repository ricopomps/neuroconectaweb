import { AiAuditReportFiltersDto, AiAuditReportResponse } from "@/lib/validation/audit-report";
import api from "@/network/axiosInstance";

const baseUrl = "audit-report";

export async function getAuditReportData(filters: AiAuditReportFiltersDto, page?: number, size?: number) {
  let url = `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
  if (page && size) {
    url += `&page=${page}&size=${size}`
  }
  const response = await api.get<AiAuditReportResponse>(url);
  return response.data;
}
