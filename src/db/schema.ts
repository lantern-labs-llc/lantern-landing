import {
  pgTable,
  uuid,
  text,
  varchar,
  numeric,
  integer,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import type {
  BusinessHours,
  PromoCode,
  FAQ,
  Review,
  TrustSignal,
  HowItWorksStep,
  PricingItem,
  FactCard,
  ServiceCategory,
  LPServiceCard,
  PractitionerInfo,
  BenefitItem,
  ExpectItem,
  DetailsRow,
} from "@/lib/types/business";

// ─── Businesses ───────────────────────────────────────────────

export const businesses = pgTable("businesses", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  tagline: text("tagline").notNull().default(""),
  description: text("description").notNull().default(""),
  owner: varchar("owner", { length: 200 }).notNull().default(""),
  ownerTitle: varchar("owner_title", { length: 200 }),
  ownerCredentials: varchar("owner_credentials", { length: 200 }),
  address: varchar("address", { length: 300 }).notNull().default(""),
  city: varchar("city", { length: 100 }).notNull().default(""),
  state: varchar("state", { length: 10 }).notNull().default(""),
  zip: varchar("zip", { length: 20 }).notNull().default(""),
  phone: varchar("phone", { length: 30 }).notNull().default(""),
  email: varchar("email", { length: 200 }),
  website: varchar("website", { length: 300 }),
  latitude: numeric("latitude"),
  longitude: numeric("longitude"),
  parking: varchar("parking", { length: 100 }),
  founded: varchar("founded", { length: 10 }),
  bookingUrl: varchar("booking_url", { length: 500 }),
  category: varchar("category", { length: 100 }),
  cname: varchar("cname", { length: 200 }),
  cnameStatus: varchar("cname_status", { length: 20 }).$type<
    "pending" | "active" | "error"
  >(),
  favicon: varchar("favicon", { length: 300 }),
  rating: numeric("rating"),
  reviewCount: integer("review_count"),
  heroSubtitle: text("hero_subtitle"),
  bundlesUrl: varchar("bundles_url", { length: 500 }),
  status: varchar("status", { length: 20 })
    .$type<"demo" | "active" | "paused" | "churned">()
    .notNull()
    .default("demo"),
  lpStatus: varchar("lp_status", { length: 20 })
    .$type<"published" | "draft" | "archived">()
    .notNull()
    .default("draft"),
  infoStatus: varchar("info_status", { length: 20 })
    .$type<"published" | "draft" | "archived">()
    .notNull()
    .default("draft"),

  // JSONB content blobs
  hours: jsonb("hours").$type<BusinessHours[]>(),
  promoCode: jsonb("promo_code").$type<PromoCode>(),
  faqs: jsonb("faqs").$type<FAQ[]>(),
  reviews: jsonb("reviews").$type<Review[]>(),
  trustSignals: jsonb("trust_signals").$type<TrustSignal[]>(),
  howItWorks: jsonb("how_it_works").$type<HowItWorksStep[]>(),
  externalProfiles:
    jsonb("external_profiles").$type<
      { platform: string; rating: string; reviewCount?: string; url: string }[]
    >(),
  practitioner: jsonb("practitioner").$type<PractitionerInfo>(),
  lpServiceCards: jsonb("lp_service_cards").$type<LPServiceCard[]>(),
  lpReviews: jsonb("lp_reviews").$type<Review[]>(),
  lpTrustItems:
    jsonb("lp_trust_items").$type<{ value: string; label: string }[]>(),
  lpBookingSteps:
    jsonb("lp_booking_steps").$type<
      { step: string; title: string; description: string }[]
    >(),
  infoFacts: jsonb("info_facts").$type<FactCard[]>(),
  infoReviews: jsonb("info_reviews").$type<Review[]>(),
  infoFaqs: jsonb("info_faqs").$type<FAQ[]>(),
  aboutSections: jsonb("about_sections").$type<string[]>(),
  differentiators:
    jsonb("differentiators").$type<{ title: string; text: string }[]>(),
  serviceCategories: jsonb("service_categories").$type<ServiceCategory[]>(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Services ─────────────────────────────────────────────────

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id),
    slug: varchar("slug", { length: 100 }).notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    shortDescription: text("short_description").notNull().default(""),
    description: text("description").notNull().default(""),
    duration: varchar("duration", { length: 50 }),
    price: varchar("price", { length: 50 }),
    isPrivate: boolean("is_private"),
    bookingUrl: varchar("booking_url", { length: 500 }),
    sortOrder: integer("sort_order").notNull().default(0),
    metaTitle: varchar("meta_title", { length: 300 }),
    metaDescription: text("meta_description"),
    lpBenefitLabel: varchar("lp_benefit_label", { length: 100 }),
    lpReviewLabel: varchar("lp_review_label", { length: 100 }),
    lpFaqLabel: varchar("lp_faq_label", { length: 100 }),
    lpBenefitSectionTitle: varchar("lp_benefit_section_title", {
      length: 200,
    }),
    researchBottomLine: text("research_bottom_line"),
    researchSources: text("research_sources"),

    // JSONB content blobs
    benefits: jsonb("benefits").$type<string[]>(),
    faqs: jsonb("faqs").$type<FAQ[]>(),
    pricing: jsonb("pricing").$type<PricingItem[]>(),
    whatToExpect: jsonb("what_to_expect").$type<DetailsRow[]>(),
    commonReasons: jsonb("common_reasons").$type<string[]>(),
    beforeAfter:
      jsonb("before_after").$type<{ before: string; after: string }>(),
    facts: jsonb("facts").$type<FactCard[]>(),
    candidacy:
      jsonb("candidacy").$type<{
        goodFor: string;
        consultFirst: string;
        safety?: string;
      }>(),
    whatsIncluded:
      jsonb("whats_included").$type<
        { title: string; description: string }[]
      >(),
    educationalSections:
      jsonb("educational_sections").$type<
        { heading: string; paragraphs: string[] }[]
      >(),
    comparisonTable:
      jsonb("comparison_table").$type<{
        headers: string[];
        rows: string[][];
      }>(),
    lpExpectItems: jsonb("lp_expect_items").$type<ExpectItem[]>(),
    lpBenefits: jsonb("lp_benefits").$type<BenefitItem[]>(),
    lpReviews: jsonb("lp_reviews").$type<Review[]>(),
    lpFaqs: jsonb("lp_faqs").$type<FAQ[]>(),
    lpTrustItems:
      jsonb("lp_trust_items").$type<{ top: string; bottom: string }[]>(),
    infoReviews: jsonb("info_reviews").$type<Review[]>(),

    lpStatus: varchar("lp_status", { length: 20 })
      .$type<"published" | "draft" | "archived">()
      .notNull()
      .default("draft"),
    infoStatus: varchar("info_status", { length: 20 })
      .$type<"published" | "draft" | "archived">()
      .notNull()
      .default("draft"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("services_business_slug_idx").on(t.businessId, t.slug)],
);

// ─── Analytics: Sessions ──────────────────────────────────────

export const analyticsSessions = pgTable(
  "analytics_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id),
    visitorId: text("visitor_id").notNull(),
    source: varchar("source", { length: 100 }),
    medium: varchar("medium", { length: 100 }),
    campaign: varchar("campaign", { length: 200 }),
    referrerUrl: text("referrer_url"),
    landingUrl: text("landing_url"),
    userAgent: text("user_agent"),
    deviceType: varchar("device_type", { length: 20 }),
    country: varchar("country", { length: 10 }),
    region: varchar("region", { length: 100 }),
    startedAt: timestamp("started_at").notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at").notNull().defaultNow(),
  },
  (t) => [
    index("sessions_business_started_idx").on(t.businessId, t.startedAt),
    index("sessions_visitor_idx").on(t.visitorId),
    index("sessions_business_source_idx").on(t.businessId, t.source),
  ],
);

// ─── Analytics: Events ────────────────────────────────────────

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => analyticsSessions.id),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id),
    eventType: varchar("event_type", { length: 50 })
      .notNull()
      .$type<
        | "page_view"
        | "book_now_click"
        | "phone_click"
        | "phone_call"
        | "promo_copy"
        | "service_card_click"
        | "directions_click"
        | "scroll_depth"
      >(),
    pagePath: text("page_path"),
    serviceSlug: varchar("service_slug", { length: 100 }),
    properties: jsonb("properties").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("events_business_type_created_idx").on(
      t.businessId,
      t.eventType,
      t.createdAt,
    ),
    index("events_session_created_idx").on(t.sessionId, t.createdAt),
    index("events_business_service_type_idx").on(
      t.businessId,
      t.serviceSlug,
      t.eventType,
    ),
  ],
);

// ─── Analytics: Calls (Twilio) ────────────────────────────────

// ─── Waitlist ────────────────────────────────────────────────

export const waitlist = pgTable("waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  businessName: varchar("business_name", { length: 200 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 10 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Analytics: Calls (Twilio) ────────────────────────────────

export const analyticsCalls = pgTable("analytics_calls", {
  id: uuid("id").defaultRandom().primaryKey(),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id),
  sessionId: uuid("session_id").references(() => analyticsSessions.id),
  twilioSid: varchar("twilio_sid", { length: 100 }).unique(),
  fromNumber: varchar("from_number", { length: 30 }),
  toNumber: varchar("to_number", { length: 30 }),
  status: varchar("status", { length: 20 })
    .notNull()
    .$type<"initiated" | "ringing" | "answered" | "completed" | "missed">(),
  durationSecs: integer("duration_secs"),
  recordingUrl: text("recording_url"),
  source: varchar("source", { length: 100 }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
});
