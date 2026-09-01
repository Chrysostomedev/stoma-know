"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SurveyFormProgressBar } from "./SurveyFormProgressBar";
import { Plus, Edit2, Trash2, ChevronRight, ChevronLeft } from "lucide-react";

interface Question {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

interface SurveyFormBuilderProps {
  surveyId?: string;
  onSave?: (data: any) => void;
  onPublish?: (data: any) => void;
  isLoading?: boolean;
}

const formSteps = [
  {
    id: "info",
    label: "Informations",
    description: "Titre et description du sondage",
  },
  {
    id: "questions",
    label: "Questions",
    description: "Construisez votre formulaire",
  },
  {
    id: "design",
    label: "Design",
    description: "Personnalisez l'apparence",
  },
  {
    id: "review",
    label: "Aperçu",
    description: "Vérifiez tout avant publication",
  },
];

export const SurveyFormBuilder: React.FC<SurveyFormBuilderProps> = ({
  onSave,
  onPublish,
  isLoading = false,
}) => {
  const t = useTranslations("creator");
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      label: "",
      type: "short_text",
      required: true,
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestionId(newQuestion.id);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onSave?.({
      title,
      description,
      questions,
    });
  };

  const handlePublish = () => {
    onPublish?.({
      title,
      description,
      questions,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Progression */}
      <SurveyFormProgressBar
        steps={formSteps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      {/* Contenu de l'étape */}
      <Card padding="lg" className="min-h-[500px]">
        {currentStep === 0 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display font-semibold text-2xl text-ink mb-2">
                {t("surveyTitle")}
              </h2>
              <p className="text-ink-muted text-sm font-sans">
                Donnez un titre clair et descriptif à votre sondage
              </p>
            </div>

            <Input
              label={t("surveyTitle")}
              placeholder="Ex: Rapport d'activité hebdomadaire"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Textarea
              label={t("surveyDescription")}
              placeholder="Décrivez l'objectif de votre sondage..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              showCharCount
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-2xl text-ink mb-2">
                  {t("addQuestion")}
                </h2>
                <p className="text-ink-muted text-sm font-sans">
                  Construisez votre formulaire en ajoutant des questions
                </p>
              </div>
              <Button
                variant="primary"
                icon={<Plus className="w-5 h-5" />}
                onClick={addQuestion}
              >
                {t("addQuestion")}
              </Button>
            </div>

            {questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-surface-active rounded-lg border-2 border-dashed border-border">
                <p className="text-ink-muted font-sans mb-4">
                  {t("addQuestion")} pour démarrer
                </p>
                <Button variant="secondary" onClick={addQuestion}>
                  {t("addQuestion")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {questions.map((q, idx) => (
                  <Card
                    key={q.id}
                    padding="md"
                    className={`p-4 border-2 ${
                      editingQuestionId === q.id
                        ? "border-accent bg-accent-lighter"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-ink-light">
                            Q{idx + 1}
                          </span>
                          <Input
                            placeholder="Question..."
                            value={q.label}
                            onChange={(e) =>
                              updateQuestion(q.id, { label: e.target.value })
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Edit2 className="w-4 h-4" />}
                          onClick={() =>
                            setEditingQuestionId(
                              editingQuestionId === q.id ? null : q.id
                            )
                          }
                        />
                        <Button
                          size="sm"
                          variant="danger"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => removeQuestion(q.id)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col gap-6 text-center py-12">
            <h2 className="font-display font-semibold text-2xl text-ink">
              Personnalisation du design
            </h2>
            <p className="text-ink-muted font-sans">
              Cette fonctionnalité sera bientôt disponible
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col gap-6">
            <h2 className="font-display font-semibold text-2xl text-ink mb-2">
              {t("preview")}
            </h2>

            <Card variant="flat" padding="md">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-ink-light font-sans">Titre</p>
                  <p className="font-display font-bold text-xl text-ink">
                    {title || "Votre sondage"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-ink-light font-sans">Description</p>
                  <p className="text-ink font-sans">
                    {description || "(Pas de description)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-ink-light font-sans mb-2">Questions</p>
                  <p className="text-ink font-sans">
                    {questions.length} question{questions.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="lg"
          icon={<ChevronLeft className="w-5 h-5" />}
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          {t("previousStep")}
        </Button>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleSave}
            isLoading={isLoading}
          >
            {t("save")}
          </Button>

          {currentStep === formSteps.length - 1 && (
            <Button
              variant="primary"
              size="lg"
              onClick={handlePublish}
              isLoading={isLoading}
            >
              {t("publishSurvey")}
            </Button>
          )}

          {currentStep < formSteps.length - 1 && (
            <Button
              variant="primary"
              size="lg"
              icon={<ChevronRight className="w-5 h-5" />}
              iconPosition="right"
              onClick={handleNext}
            >
              {t("nextStep")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

SurveyFormBuilder.displayName = "SurveyFormBuilder";
