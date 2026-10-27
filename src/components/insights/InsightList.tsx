"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORY_LABELS, type Insight, type InsightCategory } from "@/content/insights";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function InsightCard({ post }: { post: Insight }) {
  return (
    <article className="flex h-full flex-col bg-surface p-7">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        <Badge tone="primary">{CATEGORY_LABELS[post.category]}</Badge>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readMinutes} min read</span>
      </div>
      <h3 className="mt-4 text-2xl">
        <Link href={`/insights/${post.slug}`} className="hover:text-primary hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-muted">{post.description}</p>
    </article>
  );
}

export function InsightList({ posts }: { posts: Insight[] }) {
  const [filter, setFilter] = useState<InsightCategory | "all">("all");
  const cats = Object.keys(CATEGORY_LABELS) as InsightCategory[];
  const shown = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
        {(["all", ...cats] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium",
              filter === c ? "border-primary bg-primary-fill text-on-primary" : "border-border hover:border-primary hover:text-primary",
            )}
          >
            {c === "all" ? "All" : CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>
      <h2 className="sr-only">Articles</h2>
      <p role="status" className="sr-only">{shown.length} articles shown</p>
      {shown.length ? (
        <ul className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2">
          {shown.map((p) => (
            <li key={p.slug}>
              <InsightCard post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-card border border-border bg-surface p-8 text-muted">No articles in this category yet.</p>
      )}
    </div>
  );
}
