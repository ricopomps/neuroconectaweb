export interface AiAuditReportFiltersDto {
  aiProvider?: AiProviders;
  model?: string;
  dateFrom?: Date;
  dateUntil?: Date;
  userName?: string;
  feature?: AiFeature;
}

export enum AiProviders {
  GOOGLE = "Google",
  OPEN_AI = "OpenAi",
}

export enum AiFeature {
  GENERATE_PAEE = "GENERATE_PAEE",
  SUMMARIZE_TEXT = "SUMMARIZE_TEXT",
}

export interface AiAuditReportResponse {
  data: AuditLog[];
  totalTokenInputQty: number;
  totalTokenOutputQty: number;
  excelUrl: string;
}

export type AuditLog = {
  id: string;
  createdAt: Date;
  aiProvider: string;
  feature: AiFeature;
  model: string;
  tokenInputQty: number;
  tokenOutputQty: number;
  imagesQty: number;
  user: {
    name: string,
  };
};
