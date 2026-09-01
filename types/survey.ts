/**
 * Types pour le système de sondage KnowStoma
 */

export type QuestionType =
  | "short_text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "rating";

export interface ConditionalRule {
  questionId: string;
  equals?: string | number | boolean;
  in?: (string | number | boolean)[];
  operator?: "equals" | "in" | "not_equals";
}

export interface SelectOption {
  id: string;
  label: string;
  description?: string;
  icon?: string; // nom d'icône Lucide ou emoji
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  helperText?: string;
  condition?: ConditionalRule;

  // Pour short_text & textarea
  maxLength?: number;
  minLength?: number;

  // Pour number
  min?: number;
  max?: number;
  step?: number;
  suffix?: string; // ex: "€", "km", "%"

  // Pour select, radio, checkbox
  options?: SelectOption[];

  // Pour rating
  maxRating?: number;
  ratingVariant?: "star" | "number" | "emoji";
  minLabel?: string;
  maxLabel?: string;

  // Pour date
  minDate?: string; // YYYY-MM-DD
  maxDate?: string; // YYYY-MM-DD
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  theme?: {
    accent?: string; // couleur primaire
    headerText?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Réponse utilisateur à une question
 */
export type AnswerValue =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined;

export interface Answer {
  questionId: string;
  value: AnswerValue;
  timestamp?: string;
}

export interface SurveyResponse {
  surveyId: string;
  answers: Answer[];
  startedAt: string;
  submittedAt?: string;
  status: "draft" | "submitted";
}
