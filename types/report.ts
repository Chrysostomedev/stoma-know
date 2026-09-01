/**
 * Types pour les rapports (réponses aux sondages)
 */

export type ReportStatus = "draft" | "submitted";

export interface Report {
  id: string;
  surveyId: string;
  userId: string;
  name: string;
  status: ReportStatus;
  department: string;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReportFilters {
  status?: ReportStatus;
  department?: string;
  search?: string;
}
