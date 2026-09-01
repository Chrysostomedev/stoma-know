"use client";

import { useContext } from "react";
import { ToastContext } from "@/context/ToastContext";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast doit être utilisé à l'intérieur de <ToastProvider>.");
  
  return {
    showToast: ctx.showToast,
    dismissToast: ctx.dismissToast,
    addToast: ctx.showToast, // Alias pour compatibility
  };
}