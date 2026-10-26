"use client";

import Script from "next/script";
import { useConsent } from "@/components/ui/CookieBanner";

/**
 * Analytics placeholder. Loads only after the visitor clicks "Accept all", and only if
 * NEXT_PUBLIC_ANALYTICS_SRC is configured. TODO: configure your provider before launch.
 */
export function Analytics() {
  const consent = useConsent();
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  if (consent !== "accepted" || !src) return null;
  return <Script src={src} data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN} strategy="afterInteractive" />;
}
