import { Survey, SelectOption } from "@/types/survey";

const activitiesOptions: SelectOption[] = [
  {
    id: "formation",
    label: "Formation",
    description: "Sessions de formation et apprentissage",
  },
  {
    id: "semblification",
    label: "Simplification",
    description: "Optimisation et amélioration de processus",
  },
  {
    id: "production",
    label: "Production",
    description: "Travaux de production et fabrication",
  },
  {
    id: "autre",
    label: "Autre",
    description: "Autre activité",
  },
];

const departmentOptions: SelectOption[] = [
  { id: "dept1", label: "Département 1" },
  { id: "dept2", label: "Département 2" },
  { id: "dept3", label: "Département 3" },
  { id: "dept4", label: "Département 4" },
];

/**
 * Rapport d'activité hebdomadaire
 * Exemple de sondage avec sections, questions conditionnelles, et différents types
 */
export const weeklyActivitySurvey: Survey = {
  id: "rapport-hebdo",
  title: "Rapport d'activité hebdomadaire",
  description:
    "Experience fluide, moderne et engageante pour collecter les rapports d'activité de votre équipe.",
  sections: [
    {
      id: "intro",
      title: "Bienvenue",
      description: undefined,
      questions: [
        {
          id: "intro-welcome",
          type: "short_text",
          label: "Comment vous appelez-vous ?",
          placeholder: "Votre nom complet",
          required: true,
          helperText: "Cela nous aide à organiser les réponses",
        },
        {
          id: "department",
          type: "select",
          label: "Quel est votre département ?",
          options: departmentOptions,
          required: true,
        },
      ],
    },
    {
      id: "activities",
      title: "Activités de la semaine",
      description: "Décrivez vos principaux travaux",
      questions: [
        {
          id: "goalStatus",
          type: "radio",
          label: "Quel est le type d'activité réalisée ?",
          description: "Sélectionnez l'option qui correspond le mieux",
          options: activitiesOptions,
          required: true,
        },
        {
          id: "blockerDetails",
          type: "textarea",
          label: "Décrivez le type d'activité réalisée",
          placeholder: "Soyez aussi détaillé que possible...",
          required: true,
          maxLength: 2000,
          condition: { questionId: "goalStatus", equals: "blocked" } as any,
        },
      ],
    },
    {
      id: "impact",
      title: "Évaluation de l'impact",
      description: "Comment évaluez-vous votre contribution ?",
      questions: [
        {
          id: "impactRating",
          type: "rating",
          label: "Comment évaluez-vous l'impact de cette activité ?",
          maxRating: 5,
          ratingVariant: "star",
          minLabel: "Faible",
          maxLabel: "Excellent",
          required: true,
        },
        {
          id: "resultComment",
          type: "textarea",
          label: "Résultats significatifs (optionnel)",
          placeholder: "Décrivez les principaux résultats observés...",
          required: false,
          maxLength: 1500,
          condition: undefined,
        },
      ],
    },
    {
      id: "feedback",
      title: "Feedback & suggestions",
      description: "Votre avis nous aide à améliorer",
      questions: [
        {
          id: "challenges",
          type: "textarea",
          label: "Quels défis avez-vous rencontrés cette semaine ?",
          placeholder: "Décrivez les obstacles rencontrés...",
          required: false,
          maxLength: 1000,
        },
        {
          id: "suggestions",
          type: "textarea",
          label: "Avez-vous des suggestions d'amélioration ?",
          placeholder: "Partagez vos idées d'amélioration...",
          required: false,
          maxLength: 1000,
        },
        {
          id: "satisfaction",
          type: "rating",
          label: "Globalement, comment évaluez-vous votre satisfaction ?",
          maxRating: 5,
          ratingVariant: "emoji",
          minLabel: "Insatisfait",
          maxLabel: "Très satisfait",
          required: true,
        },
      ],
    },
  ],
};

/**
 * Tableau de tous les sondages disponibles
 */
export const surveys: Survey[] = [weeklyActivitySurvey];

/**
 * Récupère un sondage par son ID
 */
export function getSurveyById(id: string): Survey | undefined {
  return surveys.find((s) => s.id === id);
}
