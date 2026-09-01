"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { reportsService } from "@/services/reportsService";
import {
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const t = useTranslations("admin");
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await reportsService.getStatistics();
        setStats(data);
      } catch (err) {
        console.error("Erreur lors du chargement des stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-r-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ink-muted font-sans">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Titre */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl text-ink">
          {t("title")}
        </h1>
        <p className="text-ink-muted font-sans">
          Vue d'ensemble de vos rapports et activités
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total */}
        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              {t("totalReports")}
            </span>
            <div className="p-2 bg-blue-lighter rounded-lg">
              <FileText className="w-5 h-5 text-blue" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display font-bold text-3xl text-ink">
              {stats?.total || 0}
            </p>
            <Badge variant="info" size="sm">
              Total
            </Badge>
          </div>
        </Card>

        {/* Soumis */}
        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              {t("submitted")}
            </span>
            <div className="p-2 bg-success-lighter rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display font-bold text-3xl text-ink">
              {stats?.submitted || 0}
            </p>
            <Badge variant="success" size="sm">
              Complétés
            </Badge>
          </div>
        </Card>

        {/* Brouillons */}
        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              {t("drafts")}
            </span>
            <div className="p-2 bg-warning-lighter rounded-lg">
              <Clock className="w-5 h-5 text-warning" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display font-bold text-3xl text-ink">
              {stats?.drafts || 0}
            </p>
            <Badge variant="warning" size="sm">
              En cours
            </Badge>
          </div>
        </Card>

        {/* Taux de complétion */}
        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light font-sans">
              {t("completionRate")}
            </span>
            <div className="p-2 bg-accent-lighter rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display font-bold text-3xl text-ink">
              {stats?.completionRate || 0}%
            </p>
            <Badge variant="primary" size="sm">
              Progression
            </Badge>
          </div>
        </Card>
      </div>

      {/* Section Départements */}
      {stats?.departmentStats && Object.keys(stats.departmentStats).length > 0 && (
        <Card padding="md" className="flex flex-col gap-4">
          <h2 className="font-display font-semibold text-lg text-ink">
            {t("departmentDistribution")}
          </h2>
          <div className="flex flex-col gap-3">
            {Object.entries(stats.departmentStats).map(([dept, count]: [string, any]) => (
              <div key={dept} className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink-light flex-1 font-sans">
                  {dept}
                </span>
                <div className="flex-1 h-2 bg-surface-active rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{
                      width: `${((count || 0) / (stats?.total || 1)) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-ink font-sans w-12 text-right">
                  {String(count)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Welcome message */}
      <Card padding="md" variant="outlined" className="flex flex-col gap-4">
        <h3 className="font-display font-semibold text-lg text-ink">
          {t("welcomeMessage")}
        </h3>
        <p className="text-ink-muted font-sans">
          Cette page affiche une vue d'ensemble de vos rapports. Utilisez le menu
          latéral pour :
        </p>
        <ul className="flex flex-col gap-2 pl-4">
          <li className="text-sm text-ink-muted font-sans">
            📊 Consulter les rapports détaillés
          </li>
          <li className="text-sm text-ink-muted font-sans">
            🎨 Personnaliser les couleurs de l'application
          </li>
          <li className="text-sm text-ink-muted font-sans">
            ⚙️ Gérer vos paramètres
          </li>
        </ul>
      </Card>
    </div>
  );
}
