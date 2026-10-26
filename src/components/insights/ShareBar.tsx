"use client";

import { useToast } from "@/components/ui/Toast";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const toast = useToast();
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "Email", href: `mailto:?subject=${t}&body=${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Share this article">
      <span className="eyebrow mr-2">Share</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target={l.name === "Email" ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
        >
          {l.name}
          {l.name !== "Email" && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            toast("Link copied", "success");
          } catch {
            toast("Could not copy the link", "error");
          }
        }}
        className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
      >
        Copy link
      </button>
    </div>
  );
}
