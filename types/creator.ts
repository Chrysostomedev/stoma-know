/**
 * Types pour l'espace créateur
 */

export type SurveyStatus = "draft" | "published" | "archived";

export interface CreatorSurvey {
  id: string;
  title: string;
  description?: string;
  status: SurveyStatus;
  questionCount: number;
  responseCount: number;
  createdAt: string;
  updatedAt: string;
  lastPublished?: string;
}

export interface CreatorFormState {
  currentStep: number;
  surveyId?: string;
  title: string;
  description?: string;
  questions: any[];
  isDirty: boolean;
}
