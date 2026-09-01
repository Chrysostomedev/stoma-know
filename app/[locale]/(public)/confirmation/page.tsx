"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { EspacePublicShell } from "@/components/espace/EspacePublicShell";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Home } from "lucide-react";

export default function ConfirmationPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get("surveyId") || "";

  return (
    <EspacePublicShell showHeader={false}>
      <div className="flex flex-col items-center justify-center gap-8 py-16 md:py-24 text-center">
        {/* Icône de succès */}
        <div className="p-6 bg-success-lighter rounded-full w-fit">
          <CheckCircle2 className="w-16 h-16 text-success" />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-3">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-ink">
            {t("survey.thank")}
          </h1>
          <p className="text-lg text-ink-muted max-w-md font-sans">
            {t("survey.submitted")}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/">
            <Button
              size="lg"
              icon={<Home className="w-5 h-5" />}
            >
              {t("common.back")}
            </Button>
          </Link>
          <Link href="/admin">
            <Button
              size="lg"
              variant="secondary"
            >
              {t("admin.title")}
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border max-w-md">
          <p className="text-sm text-ink-light font-sans">
            {t("survey.secureData")}
          </p>
        </div>
      </div>
    </EspacePublicShell>
  );
}
