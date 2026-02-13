"use client";

import { useState } from "react";
import { ChevronRight, MapPin, Tag, Code, Globe } from "lucide-react";
import type { AdminBusiness, AdminService } from "@/data/businesses";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  demo: "bg-blue-100 text-blue-700",
  paused: "bg-yellow-100 text-yellow-700",
  churned: "bg-red-100 text-red-700",
};

const pageStatusColors: Record<string, string> = {
  published: "text-green-700",
  draft: "text-yellow-700",
  archived: "text-neutral-500",
};

function PageCell({ publicHref, previewHref, status }: { publicHref: string; previewHref: string; status: string }) {
  const href = status === "published" ? publicHref : previewHref;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <td className="border border-border/50 p-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center px-3 py-2.5 no-underline text-sm font-medium ${pageStatusColors[status] ?? "text-neutral-500"}`}
      >
        {label}
      </a>
    </td>
  );
}

export default function BusinessCard({ biz }: { biz: AdminBusiness }) {
  const [open, setOpen] = useState(false);
  const totalPages = 2 + biz.services.length * 2;

  const rows: { name: string; lpPublic: string; lpPreview: string; infoPublic: string; infoPreview: string; lpStatus: string; infoStatus: string }[] = [
    {
      name: biz.name,
      lpPublic: `/b/${biz.slug}`,
      lpPreview: `/admin/preview/b/${biz.slug}`,
      infoPublic: `/b/${biz.slug}/info`,
      infoPreview: `/admin/preview/b/${biz.slug}/info`,
      lpStatus: biz.lpStatus,
      infoStatus: biz.infoStatus,
    },
    ...(biz.services as AdminService[]).map((s) => ({
      name: s.name,
      lpPublic: `/b/${biz.slug}/s/${s.slug}`,
      lpPreview: `/admin/preview/b/${biz.slug}/s/${s.slug}`,
      infoPublic: `/b/${biz.slug}/s/${s.slug}/info`,
      infoPreview: `/admin/preview/b/${biz.slug}/s/${s.slug}/info`,
      lpStatus: s.lpStatus,
      infoStatus: s.infoStatus,
    })),
  ];

  return (
    <div className="border border-border rounded-xl bg-background p-6">
      <div
        className="flex items-start gap-2 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
          <ChevronRight
            size={16}
            className={`shrink-0 mt-1 text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg">{biz.name}</h2>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide leading-none ${
                  statusColors[biz.status] ?? "bg-neutral-100 text-neutral-500"
                }`}>
                  {biz.status}
                </span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground shrink-0">
                {totalPages} pages &middot; {biz.services.length} services
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} className="text-primary/40" />
                {biz.city}, {biz.state}
              </span>
              <span className="inline-flex items-center gap-1">
                <Tag size={11} className="text-primary/40" />
                {biz.category ?? "Uncategorized"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Code size={11} className="text-primary/40" />
                <span className="font-mono">/b/{biz.slug}</span>
              </span>
              {biz.cname && (
                <span className="inline-flex items-center gap-1">
                  <Globe size={11} className="text-primary/40" />
                  <span className="font-mono">{biz.cname}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide leading-none ${
                    biz.cnameStatus === "active"
                      ? "bg-green-100 text-green-700"
                      : biz.cnameStatus === "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {biz.cnameStatus ?? "Pending"}
                  </span>
                </span>
              )}
            </div>
          </div>
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
              <tr key={row.lpPublic} className={`hover:bg-primary/5 transition-colors ${i === 0 ? "bg-background font-medium" : "bg-white"}`}>
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
                <PageCell publicHref={row.infoPublic} previewHref={row.infoPreview} status={row.infoStatus} />
                <PageCell publicHref={row.lpPublic} previewHref={row.lpPreview} status={row.lpStatus} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
