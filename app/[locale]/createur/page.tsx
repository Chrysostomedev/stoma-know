"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Plus,
  BarChart3,
  Share2,
  Eye,
  Edit2,
  Archive,
  MessageSquare,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Survey {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  questions: number;
  responses: number;
  createdAt: string;
  lastModified: string;
}

// Données mockées
const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Rapport d'activité hebdomadaire",
    status: "published",
    questions: 12,
    responses: 24,
    createdAt: "2026-01-15",
    lastModified: "2026-01-20",
  },
  {
    id: "2",
    title: "Satisfaction client Q1",
    status: "draft",
    questions: 8,
    responses: 0,
    createdAt: "2026-01-18",
    lastModified: "2026-01-20",
  },
  {
    id: "3",
    title: "Sondage RH - Engagement",
    status: "published",
    questions: 15,
    responses: 156,
    createdAt: "2025-12-01",
    lastModified: "2025-12-15",
  },
];

export default function CreatorPage() {
  const t = useTranslations("creator");

  const published = mockSurveys.filter((s) => s.status === "published");
  const drafts = mockSurveys.filter((s) => s.status === "draft");

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-display font-bold text-3xl text-ink">
            {t("mySurveys")}
          </h1>
          <p className="text-ink-muted font-sans">
            Créez, gérez et analysez vos sondages
          </p>
        </div>
        <Link href="/createur/nouveau">
          <Button size="lg" icon={<Plus className="w-5 h-5" />}>
            {t("createNew")}
          </Button>
        </Link>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              {t("mySurveys")}
            </span>
            <div className="p-2 bg-blue-lighter rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue" />
            </div>
          </div>
          <p className="font-display font-bold text-3xl text-ink">
            {mockSurveys.length}
          </p>
        </Card>

        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              {t("published")}
            </span>
            <div className="p-2 bg-success-lighter rounded-lg">
              <BarChart3 className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="font-display font-bold text-3xl text-ink">
            {published.length}
          </p>
        </Card>

        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              Réponses totales
            </span>
            <div className="p-2 bg-amber-lighter rounded-lg">
              <MessageSquare className="w-5 h-5 text-amber" />
            </div>
          </div>
          <p className="font-display font-bold text-3xl text-ink">
            {mockSurveys.reduce((sum, s) => sum + s.responses, 0)}
          </p>
        </Card>
      </div>

      {/* Sondages publiés */}
      {published.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-2xl text-ink">
              {t("published")}
            </h2>
            <Badge variant="success">{published.length} actif</Badge>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {published.map((survey) => (
              <Card
                key={survey.id}
                padding="md"
                interactive
                className="flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-sans font-semibold text-ink truncate">
                      {survey.title}
                    </h3>
                    <Badge variant="success" size="sm">
                      {t("published")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-ink-light font-sans">
                    <span>{survey.questions} questions</span>
                    <span>{survey.responses} réponses</span>
                    <span>Modifié {survey.lastModified}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/createur/${survey.id}`}>
                    <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth">
                      <Eye className="w-5 h-5 text-ink-muted" />
                    </button>
                  </Link>
                  <Link href={`/createur/${survey.id}/edit`}>
                    <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth">
                      <Edit2 className="w-5 h-5 text-ink-muted" />
                    </button>
                  </Link>
                  <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth">
                    <Share2 className="w-5 h-5 text-ink-muted" />
                  </button>
                  <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth">
                    <BarChart3 className="w-5 h-5 text-ink-muted" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Brouillons */}
      {drafts.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-2xl text-ink">
              {t("drafts")}
            </h2>
            <Badge variant="warning">{drafts.length} à compléter</Badge>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {drafts.map((survey) => (
              <Card
                key={survey.id}
                padding="md"
                interactive
                variant="flat"
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-sans font-semibold text-ink">
                      {survey.title}
                    </h3>
                    <Badge variant="warning" size="sm">
                      {t("drafts")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-ink-light font-sans">
                    <span>{survey.questions} questions</span>
                    <span>Créé {survey.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/createur/${survey.id}/edit`}>
                    <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth">
                      <Edit2 className="w-5 h-5 text-ink-muted" />
                    </button>
                  </Link>
                  <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth">
                    <Archive className="w-5 h-5 text-ink-muted" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Vide */}
      {mockSurveys.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-surface-active rounded-lg border-2 border-dashed border-border">
          <MessageSquare className="w-12 h-12 text-ink-light mb-4" />
          <h3 className="font-display font-semibold text-xl text-ink mb-2">
            Pas de sondage encore
          </h3>
          <p className="text-ink-muted font-sans mb-6 text-center max-w-sm">
            Commencez par créer votre premier sondage pour collecter des données
          </p>
          <Link href="/createur/nouveau">
            <Button icon={<Plus className="w-5 h-5" />}>
              {t("createNew")}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
