import { Survey } from "@/types/survey";
import { surveys, getSurveyById } from "@/data/surveySchema";

/**
 * Service pour accéder aux schémas de sondage
 * Mocké en mémoire pour l'instant, remplaçable par un appel API
 */

export const surveyService = {
  /**
   * Récupère tous les sondages disponibles
   */
  async listSurveys(): Promise<Survey[]> {
    // Simuler une latence réseau
    await new Promise((resolve) => setTimeout(resolve, 100));
    return surveys;
  },

  /**
   * Récupère un sondage par son ID
   */
  async getSurveySchema(surveyId: string): Promise<Survey | null> {
    // Simuler une latence réseau
    await new Promise((resolve) => setTimeout(resolve, 100));
    const survey = getSurveyById(surveyId);
    return survey || null;
  },

  /**
   * Récupère le nombre total de questions d'un sondage
   */
  async getQuestionCount(surveyId: string): Promise<number> {
    const survey = await this.getSurveySchema(surveyId);
    if (!survey) return 0;
    return survey.sections.reduce((acc, section) => acc + section.questions.length, 0);
  },
};
