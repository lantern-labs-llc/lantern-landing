import { z } from "zod";
import type {
  Review,
  LPServiceCard,
  HowItWorksStep,
  TrustSignal,
  FAQ,
  FactCard,
  BusinessHours,
} from "@/lib/types/business";
import { businesses } from "@/db/schema";

const hoursSchema = z.object({
  day: z.string(),
  open: z.string(),
  close: z.string(),
  closed: z.boolean().optional(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const businessDraftSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().default(""),
  description: z.string().default(""),
  heroSubtitle: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  owner: z.string().default(""),
  ownerTitle: z.string().nullable().optional(),
  ownerCredentials: z.string().nullable().optional(),
  address: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  zip: z.string().default(""),
  phone: z.string().default(""),
  email: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  bookingUrl: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  rating: z.number().nullable().optional(),
  reviewCount: z.number().nullable().optional(),
  hours: z.array(hoursSchema).default([]),
  parking: z.string().nullable().optional(),
  founded: z.string().nullable().optional(),
  aboutSections: z.array(z.string()).default([]),
  differentiators: z
    .array(z.object({ title: z.string(), text: z.string() }))
    .default([]),
  infoFacts: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .default([]),
  infoFaqs: z.array(faqSchema).default([]),
  faqs: z.array(faqSchema).default([]),
  trustSignals: z
    .array(
      z.object({ icon: z.string(), title: z.string(), detail: z.string() }),
    )
    .default([]),
  howItWorks: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .default([]),
  reviews: z.array(z.any()).default([]),
  lpServiceCards: z.array(z.any()).default([]),
  lpTrustItems: z.array(z.any()).default([]),
  lpBookingSteps: z.array(z.any()).default([]),
});

export type BusinessDraftInput = z.infer<typeof businessDraftSchema>;

export function toInsertValues(
  parsed: BusinessDraftInput,
): typeof businesses.$inferInsert {
  return {
    slug: parsed.slug,
    name: parsed.name,
    tagline: parsed.tagline,
    description: parsed.description,
    heroSubtitle: parsed.heroSubtitle ?? null,
    category: parsed.category ?? null,
    owner: parsed.owner,
    ownerTitle: parsed.ownerTitle ?? null,
    ownerCredentials: parsed.ownerCredentials ?? null,
    address: parsed.address,
    city: parsed.city,
    state: parsed.state,
    zip: parsed.zip,
    phone: parsed.phone,
    email: parsed.email ?? null,
    website: parsed.website ?? null,
    bookingUrl: parsed.bookingUrl ?? null,
    latitude: parsed.latitude?.toString() ?? null,
    longitude: parsed.longitude?.toString() ?? null,
    rating: parsed.rating?.toString() ?? null,
    reviewCount: parsed.reviewCount ?? null,
    hours: parsed.hours as BusinessHours[],
    parking: parsed.parking ?? null,
    founded: parsed.founded ?? null,
    aboutSections: parsed.aboutSections,
    differentiators: parsed.differentiators as { title: string; text: string }[],
    infoFacts: parsed.infoFacts as FactCard[],
    infoFaqs: parsed.infoFaqs as FAQ[],
    faqs: parsed.faqs as FAQ[],
    trustSignals: parsed.trustSignals as TrustSignal[],
    howItWorks: parsed.howItWorks as HowItWorksStep[],
    reviews: parsed.reviews as Review[],
    lpServiceCards: parsed.lpServiceCards as LPServiceCard[],
    lpTrustItems: parsed.lpTrustItems as { value: string; label: string }[],
    lpBookingSteps:
      parsed.lpBookingSteps as { step: string; title: string; description: string }[],
    status: "demo",
    lpStatus: "draft",
    infoStatus: "draft",
  };
}
