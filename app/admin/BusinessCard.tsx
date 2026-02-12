"use client";

import { useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import type { Business } from "@/lib/types/business";

function PageCell({ href }: { href: string }) {
  return (
    <td className="border border-border/50 p-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-3 py-2.5 no-underline text-inherit"
      >
        <span className="inline-flex items-center gap-1 text-sm text-primary">
          Preview
          <ExternalLink size={11} />
        </span>
        <span className="text-[11px] text-muted-foreground italic">
          (Awaiting review)
        </span>
      </a>
    </td>
  );
}

export default function BusinessCard({ biz }: { biz: Business }) {
  const [open, setOpen] = useState(false);
  const totalPages = 2 + biz.services.length * 2;

  const rows = [
    { name: biz.name, lpHref: `/b/${biz.slug}`, infoHref: `/b/${biz.slug}/info` },
    ...biz.services.map((s) => ({
      name: s.name,
      lpHref: `/b/${biz.slug}/s/${s.slug}`,
      infoHref: `/b/${biz.slug}/s/${s.slug}/info`,
    })),
  ];

  return (
    <div className="border border-border rounded-xl bg-background p-6">
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <ChevronRight
            size={16}
            className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
          <div>
            <h2 className="font-display text-lg">{biz.name}</h2>
            <p className="text-xs text-muted-foreground font-mono">/b/{biz.slug}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {totalPages} pages &middot; {biz.services.length} services
        </span>
      </div>

      {open && (
        <table className="mt-5 w-full border-collapse text-sm">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-[hsl(var(--lantern-warm))]/50">
              <th className="text-left px-3 py-2 border border-border/50 font-semibold">Page</th>
              <th className="text-center px-3 py-2 border border-border/50 font-semibold">Info Page</th>
              <th className="text-center px-3 py-2 border border-border/50 font-semibold">Landing Page</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.lpHref} className={`hover:bg-primary/5 transition-colors ${i === 0 ? "bg-background font-medium" : "bg-white"}`}>
                <td className="px-3 py-2.5 border border-border/50">
                  {i === 0 ? (
                    row.name
                  ) : (
                    <span className="inline-flex items-center gap-1.5 pl-4">
                      <span className="text-muted-foreground/50">↳</span>
                      {row.name}
                    </span>
                  )}
                </td>
                <PageCell href={row.infoHref} />
                <PageCell href={row.lpHref} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
