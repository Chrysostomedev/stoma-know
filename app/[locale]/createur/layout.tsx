"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogOut, Menu, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatorLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    label: "mySurveys",
    href: "/createur",
    icon: "📋",
  },
  {
    label: "drafts",
    href: "/createur/brouillons",
    icon: "📝",
  },
  {
    label: "published",
    href: "/createur/publies",
    icon: "✅",
  },
  {
    label: "archived",
    href: "/createur/archives",
    icon: "📦",
  },
];

export default function CreatorLayout({ children }: CreatorLayoutProps) {
  const t = useTranslations("creator");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-canvas">
      {/* Overlay sur mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border lg:relative lg:z-auto lg:translate-x-0 transition-transform duration-300 ease-out flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header sidebar */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold text-sm">
              K
            </div>
            <span className="font-display font-semibold text-ink">
              {t("title")}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-surface-active rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CTA Créer */}
        <div className="p-4">
          <Link href="/createur/nouveau">
            <button className="w-full flex items-center gap-2 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-smooth font-sans font-medium text-sm">
              <Plus className="w-5 h-5" />
              {t("createNew")}
            </button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-smooth font-sans text-sm font-medium text-left",
                    isActive
                      ? "bg-accent text-white"
                      : "text-ink hover:bg-surface-active"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{t(item.label as any)}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="border-t border-border p-4 flex flex-col gap-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-active transition-smooth font-sans text-sm font-medium text-ink text-left">
            <LogOut className="w-5 h-5" />
            <span>{t("back")}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <div className="border-b border-border bg-surface sticky top-0 z-40">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-surface-active rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display font-semibold text-ink text-xl flex-1 text-center lg:text-left">
              {t("title")}
            </h1>
            <LanguageSwitcher variant="button" />
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 px-4 sm:px-6 py-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
