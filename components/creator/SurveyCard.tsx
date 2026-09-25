"use client";

import React from "react";
import Link from "next/link";
import { Eye, Edit2, Share2, BarChart3, ArrowRight } from "lucide-react";

export interface Survey {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  questions: number;
  responses: number;
  createdAt: string;
  lastModified: string;
}

const statusConfig = {
  published: { label: "Publié", dot: "bg-success", rail: "bg-success" },
  draft: { label: "Brouillon", dot: "bg-amber", rail: "bg-amber" },
  archived: { label: "Archivé", dot: "bg-ink-light", rail: "bg-border" },
} as const;

interface SurveyCardProps {
  survey: Survey;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ survey }) => {
  const status = statusConfig[survey.status];
  const isDraft = survey.status === "draft";

  return (
    <div className="group relative flex items-center gap-5 rounded-lg border border-border bg-surface pl-5 pr-4 py-4 transition-colors hover:border-ink-light/40">
      <span className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${status.rail}`} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          <span className="text-xs font-medium text-ink-light font-sans">
            {status.label}
          </span>
        </div>
        <h3 className="font-sans font-semibold text-ink truncate mb-1">
          {survey.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-ink-light font-sans">
          <span>
            {survey.questions} question{survey.questions > 1 ? "s" : ""}
          </span>
          <span className="text-border">·</span>
          {isDraft ? (
            <span>Créé le {survey.createdAt}</span>
          ) : (
            <span>
              {survey.responses} réponse{survey.responses > 1 ? "s" : ""}
            </span>
          )}
          <span className="text-border">·</span>
          <span>Modifié {survey.lastModified}</span>
        </div>
      </div>

      {isDraft ? (
        <Link
          href={`/createur/${survey.id}/edit`}
          className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors flex-shrink-0"
        >
          Reprendre
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/createur/${survey.id}`}>
            <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth" aria-label="Aperçu">
              <Eye className="w-4 h-4 text-ink-muted" />
            </button>
          </Link>
          <Link href={`/createur/${survey.id}/edit`}>
            <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth" aria-label="Modifier">
              <Edit2 className="w-4 h-4 text-ink-muted" />
            </button>
          </Link>
          <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth" aria-label="Partager">
            <Share2 className="w-4 h-4 text-ink-muted" />
          </button>
          <button className="p-2 hover:bg-surface-active rounded-lg transition-smooth" aria-label="Statistiques">
            <BarChart3 className="w-4 h-4 text-ink-muted" />
          </button>
        </div>
      )}
    </div>
  );
};

SurveyCard.displayName = "SurveyCard";