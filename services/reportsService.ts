import { Report, ReportStatus, ReportFilters } from "@/types/report";
import { SurveyResponse, Answer } from "@/types/survey";
import { generateId } from "@/lib/utils";
import { mockReports } from "@/data/mockReports";

/**
 * Service pour gérer les rapports (réponses aux sondages)
 * Mocké en mémoire pour l'instant, remplaçable par un appel API/BDD
 */

let reportsStore: Report[] = [...mockReports];
let responsesStore: SurveyResponse[] = [];

export const reportsService = {
  /**
   * Liste tous les rapports avec filtres optionnels
   */
  async listReports(filters?: ReportFilters): Promise<Report[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    let filtered = [...reportsStore];

    if (filters?.status) {
      filtered = filtered.filter((r) => r.status === filters.status);
    }

    if (filters?.department) {
      filtered = filtered.filter((r) => r.department === filters.department);
    }

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.department.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  /**
   * Récupère un rapport par son ID
   */
  async getReportById(reportId: string): Promise<Report | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return reportsStore.find((r) => r.id === reportId) || null;
  },

  /**
   * Crée un nouveau rapport en brouillon
   */
  async createReport(surveyId: string, userId: string): Promise<Report> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const report: Report = {
      id: generateId("report"),
      surveyId,
      userId,
      name: "Nouveau rapport",
      status: "draft",
      department: "Département 1",
      submittedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reportsStore.push(report);
    return report;
  },

  /**
   * Met à jour le statut d'un rapport
   */
  async updateReportStatus(
    reportId: string,
    status: ReportStatus
  ): Promise<Report | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const report = reportsStore.find((r) => r.id === reportId);
    if (!report) return null;

    report.status = status;
    report.updatedAt = new Date().toISOString();

    if (status === "submitted") {
      report.submittedAt = new Date().toISOString();
    }

    return report;
  },

  /**
   * Supprime un rapport
   */
  async deleteReport(reportId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const index = reportsStore.findIndex((r) => r.id === reportId);
    if (index === -1) return false;

    reportsStore.splice(index, 1);
    return true;
  },

  /**
   * Sauvegarde une réponse à un sondage (brouillon)
   */
  async saveSurveyResponse(response: SurveyResponse): Promise<SurveyResponse> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const existing = responsesStore.find(
      (r) => r.surveyId === response.surveyId
    );

    if (existing) {
      existing.answers = response.answers;
      existing.status = response.status;
      return existing;
    }

    responsesStore.push(response);
    return response;
  },

  /**
   * Soumet une réponse à un sondage
   */
  async submitSurveyResponse(
    surveyId: string,
    answers: Answer[]
  ): Promise<Report> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Créer un rapport pour cette soumission
    const report: Report = {
      id: generateId("report"),
      surveyId,
      userId: generateId("user"),
      name: `Soumission - ${new Date().toLocaleDateString("fr-FR")}`,
      status: "submitted",
      department: "Département 1",
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reportsStore.push(report);

    // Stocker la réponse complète
    const response: SurveyResponse = {
      surveyId,
      answers,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };

    responsesStore.push(response);
    return report;
  },

  /**
   * Récupère les statistiques globales
   */
  async getStatistics() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const total = reportsStore.length;
    const submitted = reportsStore.filter((r) => r.status === "submitted").length;
    const drafts = reportsStore.filter((r) => r.status === "draft").length;
    const completionRate = total === 0 ? 0 : Math.round((submitted / total) * 100);

    const departmentStats = reportsStore.reduce(
      (acc, report) => {
        acc[report.department] = (acc[report.department] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total,
      submitted,
      drafts,
      completionRate,
      departmentStats,
    };
  },
};
