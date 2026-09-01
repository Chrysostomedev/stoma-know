import { Report } from "@/types/report";

/**
 * Données mockées pour la démo
 * Rapports soumis + brouillons pour tester le dashboard
 */

export const mockReports: Report[] = [
  {
    id: "report-1",
    surveyId: "rapport-hebdo",
    userId: "user-1",
    name: "Rapport hebdo - Jean Dupont",
    status: "submitted",
    department: "Département 1",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "report-2",
    surveyId: "rapport-hebdo",
    userId: "user-2",
    name: "Rapport hebdo - Marie Martin",
    status: "submitted",
    department: "Département 2",
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "report-3",
    surveyId: "rapport-hebdo",
    userId: "user-3",
    name: "Rapport hebdo - Pierre Leclerc",
    status: "draft",
    department: "Département 1",
    submittedAt: null,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "report-4",
    surveyId: "rapport-hebdo",
    userId: "user-4",
    name: "Rapport hebdo - Sophie Gauthier",
    status: "submitted",
    department: "Département 3",
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "report-5",
    surveyId: "rapport-hebdo",
    userId: "user-5",
    name: "Rapport hebdo - Thomas Blanc",
    status: "submitted",
    department: "Département 2",
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "report-6",
    surveyId: "rapport-hebdo",
    userId: "user-6",
    name: "Rapport hebdo - Nathalie Rousseau",
    status: "draft",
    department: "Département 4",
    submittedAt: null,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];
