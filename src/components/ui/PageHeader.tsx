import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Page title block with breadcrumbs (visible and as JSON-LD). */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <div className="container-content pb-12 pt-8 md:pb-16 md:pt-12">
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-primary hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="eyebrow mt-10">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-4xl leading-[1.06] md:text-6xl">{title}</h1>
      {intro && <div className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{intro}</div>}
      {children}
    </div>
  );
}
