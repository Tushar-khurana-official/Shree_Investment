"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ToastTone = "success" | "error" | "info";
type ToastItem = { id: number; message: string; tone: ToastTone };

const ToastContext = createContext<(message: string, tone?: ToastTone) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastTone, string> = { success: "✓", error: "!", info: "i" };
const labels: Record<ToastTone, string> = { success: "Success", error: "Error", info: "Note" };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const show = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex max-w-md items-center gap-3 rounded-full border bg-surface px-5 py-3 text-sm shadow-lg animate-fade-up",
              t.tone === "error" ? "border-risk text-risk" : "border-border text-fg",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                t.tone === "error" ? "bg-risk text-on-primary" : "bg-primary text-on-primary",
              )}
            >
              {icons[t.tone]}
            </span>
            <span>
              <span className="sr-only">{labels[t.tone]}: </span>
              {t.message}
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
