import React from "react";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";

interface AdminNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface EspaceAdminShellProps {
  children: React.ReactNode;
  navItems?: AdminNavItem[];
  activeNav?: string;
  onNavChange?: (id: string) => void;
}

/**
 * Shell pour l'espace admin
 * Mise en page avec navigation latérale (Vue d'ensemble, Rapports, Paramètres)
 * Pensée pour la densité d'information
 */
export const EspaceAdminShell = React.forwardRef<
  HTMLDivElement,
  EspaceAdminShellProps
>(
  (
    {
      children,
      navItems = [],
      activeNav = "overview",
      onNavChange,
    },
    ref
  ) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
      <div ref={ref} className="min-h-screen flex flex-col lg:flex-row bg-canvas">
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
            "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border lg:relative lg:z-auto lg:translate-x-0 transition-transform duration-300 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Header sidebar */}
          <div className="border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold text-sm">
                K
              </div>
              <span className="font-display font-semibold text-ink">Admin</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-surface-active rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavChange?.(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-smooth font-sans text-sm font-medium text-left",
                  activeNav === item.id
                    ? "bg-accent text-white"
                    : "text-ink hover:bg-surface-active"
                )}
              >
                <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer sidebar */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-active transition-smooth font-sans text-sm font-medium text-ink text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Topbar */}
          <div className="border-b border-border bg-surface">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-surface-active rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-display font-semibold text-ink text-xl flex-1 text-center lg:text-left">
                Tableau de bord
              </h1>
              <div className="w-10 lg:flex" />
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
);

EspaceAdminShell.displayName = "EspaceAdminShell";
