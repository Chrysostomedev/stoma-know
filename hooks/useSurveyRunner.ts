import { useState, useCallback, useMemo } from "react";
import { Survey, Question, Answer, AnswerValue, ConditionalRule } from "@/types/survey";

interface UseSurveyRunnerProps {
  survey: Survey;
}

interface UseSurveyRunnerState {
  answers: Record<string, AnswerValue>;
  currentQuestionId: string | null;
  isReview: boolean;
}

/**
 * Hook cœur du parcours "une question à la fois"
 * Gère :
 * - Visibilité dynamique (questions conditionnelles)
 * - Validation
 * - Navigation (prev/next/jump)
 * - Progression
 */
export function useSurveyRunner({ survey }: UseSurveyRunnerProps) {
  const [state, setState] = useState<UseSurveyRunnerState>({
    answers: {},
    currentQuestionId: null,
    isReview: false,
  });

  // Aplatit les sections en liste unique de questions
  const allQuestions = useMemo(() => {
    return survey.sections.flatMap((section) => section.questions);
  }, [survey]);

  // Détermine quelles questions sont visibles (logique conditionnelle)
  const visibleQuestions = useMemo(() => {
    return allQuestions.filter((question) => {
      if (!question.condition) return true;
      return evaluateCondition(question.condition, state.answers);
    });
  }, [allQuestions, state.answers]);

  // Index de la question actuelle
  const currentQuestionIndex = useMemo(() => {
    if (!state.currentQuestionId) return 0;
    return visibleQuestions.findIndex((q) => q.id === state.currentQuestionId);
  }, [state.currentQuestionId, visibleQuestions]);

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const progressPercent = useMemo(() => {
    if (visibleQuestions.length === 0) return 100;
    return Math.round(((currentQuestionIndex + 1) / visibleQuestions.length) * 100);
  }, [currentQuestionIndex, visibleQuestions.length]);

  // Initialise le premier question
  const initSurvey = useCallback(() => {
    if (visibleQuestions.length > 0) {
      setState((s) => ({
        ...s,
        currentQuestionId: visibleQuestions[0].id,
      }));
    }
  }, [visibleQuestions]);

  // Met à jour la réponse actuelle
  const updateAnswer = useCallback((value: AnswerValue) => {
    if (!currentQuestion) return;
    setState((s) => ({
      ...s,
      answers: {
        ...s.answers,
        [currentQuestion.id]: value,
      },
    }));
  }, [currentQuestion]);

  // Valide la réponse actuelle
  const validateCurrent = useCallback((): string | null => {
    if (!currentQuestion) return null;

    // Champ requis vide
    if (
      currentQuestion.required &&
      (state.answers[currentQuestion.id] === undefined ||
        state.answers[currentQuestion.id] === null ||
        state.answers[currentQuestion.id] === "" ||
        (Array.isArray(state.answers[currentQuestion.id]) &&
          (state.answers[currentQuestion.id] as any[]).length === 0))
    ) {
      return "Cette question est obligatoire";
    }

    // Validation custom par type
    const value = state.answers[currentQuestion.id];

    if (currentQuestion.type === "short_text" && currentQuestion.minLength) {
      if (
        typeof value === "string" &&
        value.length < currentQuestion.minLength
      ) {
        return `Minimum ${currentQuestion.minLength} caractères`;
      }
    }

    if (currentQuestion.type === "number") {
      const num = Number(value);
      if (currentQuestion.min !== undefined && num < currentQuestion.min) {
        return `Minimum ${currentQuestion.min}`;
      }
      if (currentQuestion.max !== undefined && num > currentQuestion.max) {
        return `Maximum ${currentQuestion.max}`;
      }
    }

    return null;
  }, [currentQuestion, state.answers]);

  // Passe à la question suivante
  const nextQuestion = useCallback(() => {
    const error = validateCurrent();
    if (error) return false;

    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setState((s) => ({
        ...s,
        currentQuestionId: visibleQuestions[currentQuestionIndex + 1].id,
      }));
      return true;
    } else {
      // Fin du sondage → afficher l'écran de vérification
      setState((s) => ({
        ...s,
        isReview: true,
      }));
      return true;
    }
  }, [currentQuestionIndex, visibleQuestions, validateCurrent]);

  // Revient à la question précédente
  const prevQuestion = useCallback(() => {
    if (state.isReview) {
      setState((s) => ({
        ...s,
        isReview: false,
      }));
      return;
    }

    if (currentQuestionIndex > 0) {
      setState((s) => ({
        ...s,
        currentQuestionId: visibleQuestions[currentQuestionIndex - 1].id,
      }));
    }
  }, [currentQuestionIndex, state.isReview, visibleQuestions]);

  // Saute directement à une question depuis l'écran de vérification
  const jumpToQuestion = useCallback((questionId: string) => {
    setState((s) => ({
      ...s,
      currentQuestionId: questionId,
      isReview: false,
    }));
  }, []);

  // Retourne les données prêtes pour la soumission
  const getSurveyData = useCallback((): Answer[] => {
    return allQuestions
      .filter((q) => evaluateCondition(q.condition, state.answers))
      .map((q) => ({
        questionId: q.id,
        value: state.answers[q.id] ?? null,
        timestamp: new Date().toISOString(),
      }));
  }, [allQuestions, state.answers]);

  return {
    // État
    answers: state.answers,
    currentQuestion,
    currentQuestionIndex,
    isReview: state.isReview,

    // Info
    visibleQuestions,
    totalQuestions: visibleQuestions.length,
    progressPercent,
    hasNextQuestion: currentQuestionIndex < visibleQuestions.length - 1,
    hasPrevQuestion: currentQuestionIndex > 0 || state.isReview,

    // Actions
    initSurvey,
    updateAnswer,
    validateCurrent,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    getSurveyData,
  };
}

/**
 * Évalue une règle conditionnelle contre les réponses actuelles
 */
function evaluateCondition(
  condition: any,
  answers: Record<string, AnswerValue>
): boolean {
  if (!condition) return true;

  const { questionId, equals, in: inValues } = condition;
  const value = answers[questionId];

  if (equals !== undefined) {
    return value === equals;
  }

  if (inValues) {
    return inValues.includes(value);
  }

  return true;
}
