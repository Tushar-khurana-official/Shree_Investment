"use client";

import { useRouter } from "next/navigation";
import { saveHandoff } from "@/lib/handoff";
import { Button } from "@/components/ui/Button";

/** Carries the result summary into the contact form message (via sessionStorage, not the URL). */
export function BookReviewButton({ calculator, summary, label = "Book a review" }: { calculator: string; summary: string; label?: string }) {
  const router = useRouter();
  return (
    <Button
      variant="accent"
      onClick={() => {
        saveHandoff(calculator, summary);
        router.push(`/contact?from=calculator&calc=${encodeURIComponent(calculator)}`);
      }}
    >
      {label}
    </Button>
  );
}
