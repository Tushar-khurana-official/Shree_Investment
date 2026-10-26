import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site, siteUrl } from "@config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PlaceholderRibbon } from "@/components/layout/PlaceholderRibbon";
import { Analytics } from "@/components/layout/Analytics";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { bootScript } from "@/lib/boot-script";
import { palette } from "@/styles/tokens";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { ToastProvider } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  // "optional": headings never reflow after first paint (no layout shift). The font is preloaded, so it is
  // used whenever it arrives in time; otherwise the size-adjusted fallback serif stays for that page view.
  display: "optional",
  // Weight axis only: the optical-size and soft axes roughly double the font payload.
  style: ["normal", "italic"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.firm.name}: ${site.firm.tagline}`, template: `%s | ${site.firm.name}` },
  description: site.firm.description,
  applicationName: site.firm.name,
  formatDetection: { telephone: false },
  robots: site.launch.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: site.firm.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: [{ url: site.firm.favicon, type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: palette.bg,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${inter.variable}${site.motion.animatedBackground ? "" : " motion-static"}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="min-h-dvh">
        <AmbientBackground />
        <ToastProvider>
          <SkipLink />
          <PlaceholderRibbon />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  );
}
