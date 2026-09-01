"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { EspacePublicShell } from "@/components/espace/EspacePublicShell";
import { SurveyRunner } from "@/components/form/SurveyRunner";
import { Survey, Answer } from "@/types/survey";
import { surveyService } from "@/services/surveyService";
import { reportsService } from "@/services/reportsService";
import { useToast } from "@/hooks/useToast";

export default function RepondrePage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const { showToast } = useToast();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const surveyId = params.surveyId as string;

  // Charge le schéma du sondage
  useEffect(() => {
    async function loadSurvey() {
      try {
        setIsLoading(true);
        const schema = await surveyService.getSurveySchema(surveyId);
        if (!schema) {
          setError(t("common.error"));
          return;
        }
        setSurvey(schema);
      } catch (err) {
        console.error("Erreur lors du chargement du sondage:", err);
        setError(t("common.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadSurvey();
  }, [surveyId, t]);

  // Gère la soumission du sondage
  const handleSubmit = async (answers: Answer[]) => {
    try {
      setIsSubmitting(true);
      await reportsService.submitSurveyResponse(surveyId, answers);

      showToast({
        variant: "success",
        title: t("survey.thank"),
        description: t("survey.submitted"),
      });

      // Redirige vers la page de confirmation
      setTimeout(() => {
        router.push(`/confirmation?surveyId=${surveyId}`);
      }, 1000);
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
      showToast({
        variant: "error",
        title: t("common.error"),
        description: "Une erreur s'est produite lors de la soumission.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <EspacePublicShell>
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col gap-4 text-center">
            <div className="w-8 h-8 border-4 border-accent border-r-transparent rounded-full animate-spin mx-auto" />
            <p className="text-ink-muted font-sans">{t("common.loading")}</p>
          </div>
        </div>
      </EspacePublicShell>
    );
  }

  if (error) {
    return (
      <EspacePublicShell>
        <div className="flex items-center justify-center py-12">
          <div className="text-center bg-danger-lighter p-8 rounded-lg">
            <p className="text-danger font-sans font-medium">{error}</p>
          </div>
        </div>
      </EspacePublicShell>
    );
  }

  if (!survey) {
    return null;
  }

  return (
    <EspacePublicShell
      surveyTitle={survey.title}
      onClose={() => router.push("/")}
    >
      <SurveyRunner
        survey={survey}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </EspacePublicShell>
  );
}
