"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Modal built on the native <dialog> element: focus is trapped, Esc closes, and the
 * background is inert. Focus returns to the element that opened it.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      (opener.current as HTMLElement | null)?.focus?.();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(92vw,560px)] rounded-card border border-border bg-surface p-0 text-fg backdrop:bg-black/50"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <h2 id="modal-title" className="text-2xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="-mr-2 -mt-1 rounded-full p-2 text-muted hover:bg-surface-2 hover:text-fg"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}
