"use client";

import React, { createContext, useCallback, useState } from "react";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { cn, generateId } from "@/lib/utils";
import { TOAST_DURATION_MS } from "@/lib/constants";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const VARIANT_STYLES: Record<ToastVariant, { icon: React.ElementType; bar: string }> = {
  success: { icon: CheckCircle2, bar: "bg-accent" },
  error: { icon: TriangleAlert, bar: "bg-danger" },
  info: { icon: Info, bar: "bg-ink-faint" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = generateId("toast");
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-full max-w-sm flex-col gap-2.5">
        {toasts.map((toast) => {
          const meta = VARIANT_STYLES[toast.variant];
          const Icon = meta.icon;
          return (
            <div
              key={toast.id}
              role="status"
              className="relative overflow-hidden rounded-xl border border-border bg-surface px-4 py-3.5 shadow-[0_8px_24px_rgba(20,23,31,0.12)] animate-[toastIn_.25s_cubic-bezier(.22,1,.36,1)]"
            >
              <span className={cn("absolute left-0 top-0 h-full w-1", meta.bar)} />
              <div className="flex items-start gap-3 pl-1.5">
                <Icon size={18} className="mt-0.5 shrink-0 text-ink" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{toast.title}</p>
                  {toast.description && <p className="mt-0.5 text-xs text-ink-muted">{toast.description}</p>}
                </div>
                <button onClick={() => dismissToast(toast.id)} className="shrink-0 rounded p-0.5 text-ink-faint hover:text-ink">
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes toastIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }`}</style>
    </ToastContext.Provider>
  );
}