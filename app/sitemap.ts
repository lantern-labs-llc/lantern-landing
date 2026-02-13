import type { MetadataRoute } from "next";
import { getPublishedPages } from "@/data/businesses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.lantern.llc";
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  const pages = await getPublishedPages();
  for (const biz of pages) {
    if (biz.hasLP) {
      entries.push({ url: `${baseUrl}/b/${biz.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 });
    }
    if (biz.hasInfo) {
      entries.push({ url: `${baseUrl}/b/${biz.slug}/info`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 });
    }

    for (const svc of biz.services) {
      if (svc.hasLP) {
        entries.push({ url: `${baseUrl}/b/${biz.slug}/s/${svc.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
      }
      if (svc.hasInfo) {
        entries.push({ url: `${baseUrl}/b/${biz.slug}/s/${svc.slug}/info`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
      }
    }
  }

  return entries;
}
