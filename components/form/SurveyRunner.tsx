"use client";

import React, { useEffect } from "react";
import { Survey } from "@/types/survey";
import { useSurveyRunner } from "@/hooks/useSurveyRunner";
import { Button } from "@/components/ui/Button";
import { QuestionField } from "@/components/form/QuestionField";
import { StepHeader } from "@/components/form/StepHeader";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface SurveyRunnerProps {
  survey: Survey;
  onSubmit: (answers: any[]) => void | Promise<void>;
  isSubmitting?: boolean;
}

/**
 * Composant principal qui orchestrate le parcours de sondage
 * Affiche une question à la fois, avec validation et navigation
 */
export const SurveyRunner: React.FC<SurveyRunnerProps> = ({
  survey,
  onSubmit,
  isSubmitting = false,
}) => {
  const runner = useSurveyRunner({ survey });
  const [error, setError] = React.useState<string | null>(null);

  // Initialise le sondage au montage
  useEffect(() => {
    runner.initSurvey();
  }, []);

  if (!runner.currentQuestion && !runner.isReview) {
    return (
      <div className="text-center py-12">
        <p className="text-ink-muted">Chargement du sondage...</p>
      </div>
    );
  }

  // Écran de vérification des réponses
  if (runner.isReview) {
    return (
      <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
        <StepHeader
          currentStep={runner.totalQuestions}
          totalSteps={runner.totalQuestions}
          title="Vérification de vos réponses"
          description="Assurez-vous que tout est correct avant de soumettre"
          showProgress={false}
          variant="compact"
        />

        {/* Liste de révision */}
        <div className="flex flex-col gap-4 bg-surface rounded-lg border border-border p-6">
          {runner.visibleQuestions.map((question, idx) => {
            const answer = runner.answers[question.id];
            const displayValue =
              answer === null || answer === undefined
                ? "(Non répondu)"
                : Array.isArray(answer)
                ? answer.join(", ")
                : String(answer);

            return (
              <div
                key={question.id}
                className="flex flex-col gap-2 pb-4 border-b border-border last:pb-0 last:border-0"
              >
                <button
                  onClick={() => runner.jumpToQuestion(question.id)}
                  className="text-left hover:text-accent transition-colors"
                >
                  <p className="text-sm text-ink-light font-sans">
                    Q{idx + 1}. {question.label}
                  </p>
                  <p className="text-base font-medium text-ink mt-1 font-sans">
                    {displayValue}
                  </p>
                </button>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-between">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => runner.prevQuestion()}
            icon={<ChevronLeft className="w-5 h-5" />}
          >
            Modifier
          </Button>
          <Button
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={<CheckCircle2 className="w-5 h-5" />}
            onClick={() => {
              onSubmit(runner.getSurveyData());
            }}
          >
            Soumettre
          </Button>
        </div>
      </div>
    );
  }

  // Question actuelle
  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      {/* Header avec progression */}
      <StepHeader
        currentStep={runner.currentQuestionIndex + 1}
        totalSteps={runner.totalQuestions}
        title={runner.currentQuestion.label}
        description={runner.currentQuestion.description}
        showProgress={true}
      />

      {/* Champ de réponse */}
      <div className="flex flex-col gap-6">
        <QuestionField
          question={runner.currentQuestion}
          value={runner.answers[runner.currentQuestion.id]}
          onChange={(value) => {
            runner.updateAnswer(value);
            setError(null);
          }}
          error={error || undefined}
        />

        {/* Erreur de validation */}
        {error && (
          <div className="p-4 bg-danger-lighter text-danger rounded-lg flex items-start gap-3 text-sm font-sans">
            <span className="flex-shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => runner.prevQuestion()}
          icon={<ChevronLeft className="w-5 h-5" />}
          disabled={!runner.hasPrevQuestion}
        >
          Précédent
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            const validationError = runner.validateCurrent();
            if (validationError) {
              setError(validationError);
              return;
            }
            runner.nextQuestion();
          }}
          icon={
            runner.hasNextQuestion ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )
          }
        >
          {runner.hasNextQuestion ? "Suivant" : "Vérifier"}
        </Button>
      </div>
    </div>
  );
};

SurveyRunner.displayName = "SurveyRunner";
