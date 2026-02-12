import type { MetadataRoute } from "next";
import { getAllBusinessSlugs, getBusinessBySlug } from "@/data/businesses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.lantern.llc";
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  for (const slug of getAllBusinessSlugs()) {
    const business = getBusinessBySlug(slug);
    if (!business) continue;

    entries.push(
      { url: `${baseUrl}/b/${slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${baseUrl}/b/${slug}/info`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    );

    for (const service of business.services) {
      entries.push(
        { url: `${baseUrl}/b/${slug}/s/${service.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/b/${slug}/s/${service.slug}/info`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      );
    }
  }

  return entries;
}
