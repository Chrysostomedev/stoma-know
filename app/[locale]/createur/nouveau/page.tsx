"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SurveyFormBuilder } from "@/components/creator/SurveyFormBuilder";
import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NewSurveyPage() {
  const t = useTranslations("creator");
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: any) => {
    setIsSaving(true);
    try {
      console.log("Sauvegarde du brouillon:", data);
      // Simuler l'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Dans une vraie app, on ferait un appel API ici
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (data: any) => {
    setIsSaving(true);
    try {
      console.log("Publication du sondage:", data);
      // Simuler l'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/createur");
    } catch (err) {
      console.error("Erreur lors de la publication:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <Link href="/createur">
        <button className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-sans font-medium">
          <ChevronLeft className="w-4 h-4" />
          {t("back")}
        </button>
      </Link>

      {/* Form Builder */}
      <SurveyFormBuilder
        onSave={handleSave}
        onPublish={handlePublish}
        isLoading={isSaving}
      />
    </div>
  );
}
