"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { EspaceAdminShell } from "@/components/espace/EspaceAdminShell";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  LayoutDashboard,
  FileText,
  Palette,
  Settings,
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [activeNav, setActiveNav] = useState("overview");

  const navItems = [
    {
      id: "overview",
      label: t("overview"),
      href: `/${locale}/admin`,
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "reports",
      label: t("reports"),
      href: `/${locale}/admin/rapports`,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "colors",
      label: t("colors"),
      href: `/${locale}/admin/parametres/couleurs`,
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: t("parameters"),
      href: `/${locale}/admin/parametres`,
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleNavChange = (id: string) => {
    const item = navItems.find((n) => n.id === id);
    if (item) {
      setActiveNav(id);
      router.push(item.href);
    }
  };

  // Détermine l'item actif basé sur la route
  React.useEffect(() => {
    if (pathname === `/${locale}/admin` || pathname === `/${locale}/admin/`) {
      setActiveNav("overview");
    } else if (pathname.startsWith(`/${locale}/admin/rapports`)) {
      setActiveNav("reports");
    } else if (pathname.startsWith(`/${locale}/admin/parametres/couleurs`)) {
      setActiveNav("colors");
    } else if (pathname.startsWith(`/${locale}/admin/parametres`)) {
      setActiveNav("settings");
    }
  }, [pathname, locale]);

  return (
    <EspaceAdminShell
      navItems={navItems}
      activeNav={activeNav}
      onNavChange={handleNavChange}
    >
      <div className="flex items-center justify-end mb-4">
        <LanguageSwitcher variant="button" />
      </div>
      {children}
    </EspaceAdminShell>
  );
}
