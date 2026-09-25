"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SurveyCard, type Survey } from "@/components/creator/SurveyCard";
import { SurveyStatsBar } from "@/components/creator/SurveyStatsBar";
import { SurveyTabs } from "@/components/creator/SurveyTabs";
import { Plus, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

// Données mockées — à remplacer par surveyService
const mockSurveys: Survey[] = [
  { id: "1", title: "Rapport d'activité hebdomadaire", status: "published", questions: 12, responses: 24, createdAt: "2026-01-15", lastModified: "2026-01-20" },
  { id: "2", title: "Satisfaction client Q1", status: "draft", questions: 8, responses: 0, createdAt: "2026-01-18", lastModified: "2026-01-20" },
  { id: "3", title: "Sondage RH - Engagement", status: "published", questions: 15, responses: 156, createdAt: "2025-12-01", lastModified: "2025-12-15" },
];

type FilterId = "all" | "published" | "draft";

export default function CreatorPage() {
  const t = useTranslations("creator");
  const [filter, setFilter] = useState<FilterId>("all");

  const published = mockSurveys.filter((s) => s.status === "published");
  const drafts = mockSurveys.filter((s) => s.status === "draft");
  const totalResponses = mockSurveys.reduce((sum, s) => sum + s.responses, 0);

  const tabs = [
    { id: "all", label: "Tous", count: mockSurveys.length },
    { id: "published", label: t("published"), count: published.length },
    { id: "draft", label: t("drafts"), count: drafts.length },
  ];

  const visibleSurveys = useMemo(() => {
    if (filter === "published") return published;
    if (filter === "draft") return drafts;
    return mockSurveys;
  }, [filter]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display font-bold text-3xl text-ink">{t("mySurveys")}</h1>
          <p className="text-ink-muted font-sans">Créez, gérez et analysez vos sondages</p>
        </div>
        <Link href="/createur/nouveau">
          <Button size="lg" icon={<Plus className="w-5 h-5" />}>{t("createNew")}</Button>
        </Link>
      </div>

      <SurveyStatsBar
        items={[
          { label: t("mySurveys"), value: mockSurveys.length },
          { label: t("published"), value: published.length },
          { label: "Réponses totales", value: totalResponses },
        ]}
      />

      <div className="flex flex-col gap-4">
        <SurveyTabs tabs={tabs} active={filter} onChange={(id) => setFilter(id as FilterId)} />

        {visibleSurveys.length > 0 ? (
          <div className="flex flex-col gap-2">
            {visibleSurveys.map((survey) => (
              <SurveyCard key={survey.id} survey={survey} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 rounded-lg border-2 border-dashed border-border">
            <MessageSquare className="w-10 h-10 text-ink-light mb-4" />
            <h3 className="font-display font-semibold text-xl text-ink mb-2">
              {mockSurveys.length === 0 ? "Pas de sondage encore" : "Rien ici pour l'instant"}
            </h3>
            <p className="text-ink-muted font-sans mb-6 text-center max-w-sm">
              {mockSurveys.length === 0
                ? "Commencez par créer votre premier sondage pour collecter des données"
                : "Change d'onglet ou crée un nouveau sondage"}
            </p>
            <Link href="/createur/nouveau">
              <Button icon={<Plus className="w-5 h-5" />}>{t("createNew")}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}