import { eq, and } from "drizzle-orm";
import { getDb } from "./index";
import { businesses, services } from "./schema";
import type { Business, Service } from "@/lib/types/business";

// When DATABASE_URL isn't set (e.g. during `next build` without a DB),
// query functions return empty results so static generation can proceed.
const hasDb = !!process.env.DATABASE_URL;

// ─── Status types ────────────────────────────────────────────

type PageStatus = "published" | "draft" | "archived";

// ─── Row → Domain mappers ─────────────────────────────────────

type BusinessRow = typeof businesses.$inferSelect;
type ServiceRow = typeof services.$inferSelect;

function toService(row: ServiceRow): Service {
  return {
    slug: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    duration: row.duration ?? undefined,
    price: row.price ?? undefined,
    isPrivate: row.isPrivate ?? undefined,
    bookingUrl: row.bookingUrl ?? undefined,
    benefits: row.benefits ?? [],
    faqs: row.faqs ?? [],
    pricing: row.pricing ?? undefined,
    whatToExpect: row.whatToExpect ?? undefined,
    commonReasons: row.commonReasons ?? undefined,
    beforeAfter: row.beforeAfter ?? undefined,
    facts: row.facts ?? undefined,
    lpExpectItems: row.lpExpectItems ?? undefined,
    lpBenefits: row.lpBenefits ?? undefined,
    lpReviews: row.lpReviews ?? undefined,
    lpFaqs: row.lpFaqs ?? undefined,
    lpTrustItems: row.lpTrustItems ?? undefined,
    lpBenefitLabel: row.lpBenefitLabel ?? undefined,
    lpReviewLabel: row.lpReviewLabel ?? undefined,
    lpFaqLabel: row.lpFaqLabel ?? undefined,
    lpBenefitSectionTitle: row.lpBenefitSectionTitle ?? undefined,
    infoReviews: row.infoReviews ?? undefined,
    educationalSections: row.educationalSections ?? undefined,
    comparisonTable: row.comparisonTable ?? undefined,
    researchBottomLine: row.researchBottomLine ?? undefined,
    researchSources: row.researchSources ?? undefined,
    whatsIncluded: row.whatsIncluded ?? undefined,
    candidacy: row.candidacy ?? undefined,
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
  };
}

function toBusiness(row: BusinessRow, serviceRows: ServiceRow[]): Business {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    owner: row.owner,
    ownerTitle: row.ownerTitle ?? undefined,
    ownerCredentials: row.ownerCredentials ?? undefined,
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip,
    phone: row.phone,
    email: row.email ?? undefined,
    website: row.website ?? undefined,
    bookingUrl: row.bookingUrl ?? undefined,
    hours: row.hours ?? [],
    services: serviceRows.map(toService),
    promoCode: row.promoCode ?? undefined,
    faqs: row.faqs ?? [],
    reviews: row.reviews ?? [],
    rating: row.rating ? Number(row.rating) : undefined,
    reviewCount: row.reviewCount ?? undefined,
    favicon: row.favicon ?? undefined,
    latitude: row.latitude ? Number(row.latitude) : undefined,
    longitude: row.longitude ? Number(row.longitude) : undefined,
    trustSignals: row.trustSignals ?? undefined,
    howItWorks: row.howItWorks ?? undefined,
    heroSubtitle: row.heroSubtitle ?? undefined,
    parking: row.parking ?? undefined,
    founded: row.founded ?? undefined,
    serviceCategories: row.serviceCategories ?? undefined,
    lpServiceCards: row.lpServiceCards ?? undefined,
    lpReviews: row.lpReviews ?? undefined,
    lpTrustItems: row.lpTrustItems ?? undefined,
    lpBookingSteps: row.lpBookingSteps ?? undefined,
    practitioner: row.practitioner ?? undefined,
    bundlesUrl: row.bundlesUrl ?? undefined,
    externalProfiles: row.externalProfiles ?? undefined,
    category: row.category ?? undefined,
    cname: row.cname ?? undefined,
    cnameStatus: row.cnameStatus ?? undefined,
    infoFacts: row.infoFacts ?? undefined,
    infoReviews: row.infoReviews ?? undefined,
    infoFaqs: row.infoFaqs ?? undefined,
    aboutSections: row.aboutSections ?? undefined,
    differentiators: row.differentiators ?? undefined,
  };
}

// ─── Public query functions (active businesses only) ──────────

export async function getAllBusinesses(): Promise<Business[]> {
  if (!hasDb) return [];

  const bizRows = await getDb()
    .select()
    .from(businesses)
    .where(eq(businesses.status, "active"));
  const svcRows = await getDb()
    .select()
    .from(services)
    .orderBy(services.sortOrder);

  return bizRows.map((biz) =>
    toBusiness(
      biz,
      svcRows.filter((s) => s.businessId === biz.id),
    ),
  );
}

export async function getBusinessBySlug(
  slug: string,
): Promise<Business | undefined> {
  if (!hasDb) return undefined;

  const [bizRow] = await getDb()
    .select()
    .from(businesses)
    .where(
      and(eq(businesses.slug, slug), eq(businesses.status, "active")),
    )
    .limit(1);
  if (!bizRow) return undefined;

  const svcRows = await getDb()
    .select()
    .from(services)
    .where(eq(services.businessId, bizRow.id))
    .orderBy(services.sortOrder);

  return toBusiness(bizRow, svcRows);
}

/**
 * Returns a business only if it's active AND the specific page is published.
 * Used by individual page components (LP or info) to gate visibility.
 */
export async function getBusinessBySlugForPage(
  slug: string,
  page: "lp" | "info",
): Promise<Business | undefined> {
  if (!hasDb) return undefined;

  const pageCol =
    page === "lp" ? businesses.lpStatus : businesses.infoStatus;

  const [bizRow] = await getDb()
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.slug, slug),
        eq(businesses.status, "active"),
        eq(pageCol, "published"),
      ),
    )
    .limit(1);
  if (!bizRow) return undefined;

  const svcRows = await getDb()
    .select()
    .from(services)
    .where(eq(services.businessId, bizRow.id))
    .orderBy(services.sortOrder);

  return toBusiness(bizRow, svcRows);
}

/**
 * Returns a service only if its specific page is published
 * AND the parent business is active.
 */
export async function getServiceBySlugForPage(
  businessSlug: string,
  serviceSlug: string,
  page: "lp" | "info",
): Promise<{ business: Business; service: Service } | undefined> {
  if (!hasDb) return undefined;

  const [bizRow] = await getDb()
    .select()
    .from(businesses)
    .where(
      and(eq(businesses.slug, businessSlug), eq(businesses.status, "active")),
    )
    .limit(1);
  if (!bizRow) return undefined;

  const pageCol =
    page === "lp" ? services.lpStatus : services.infoStatus;

  const [svcRow] = await getDb()
    .select()
    .from(services)
    .where(
      and(
        eq(services.businessId, bizRow.id),
        eq(services.slug, serviceSlug),
        eq(pageCol, "published"),
      ),
    )
    .limit(1);
  if (!svcRow) return undefined;

  // Fetch all services to populate business.services
  const allSvcRows = await getDb()
    .select()
    .from(services)
    .where(eq(services.businessId, bizRow.id))
    .orderBy(services.sortOrder);

  return {
    business: toBusiness(bizRow, allSvcRows),
    service: toService(svcRow),
  };
}

export async function getAllBusinessSlugs(): Promise<string[]> {
  if (!hasDb) return [];

  const rows = await getDb()
    .select({ slug: businesses.slug })
    .from(businesses)
    .where(eq(businesses.status, "active"));
  return rows.map((r) => r.slug);
}

export function getServiceBySlug(
  business: Business,
  serviceSlug: string,
): Service | undefined {
  return business.services.find((s) => s.slug === serviceSlug);
}

/**
 * Returns published page info for the sitemap.
 * Only includes pages where business is active AND the specific page is published.
 */
export async function getPublishedPages(): Promise<
  {
    slug: string;
    hasLP: boolean;
    hasInfo: boolean;
    services: { slug: string; hasLP: boolean; hasInfo: boolean }[];
  }[]
> {
  if (!hasDb) return [];

  const bizRows = await getDb()
    .select({
      id: businesses.id,
      slug: businesses.slug,
      lpStatus: businesses.lpStatus,
      infoStatus: businesses.infoStatus,
    })
    .from(businesses)
    .where(eq(businesses.status, "active"));

  const svcRows = await getDb()
    .select({
      businessId: services.businessId,
      slug: services.slug,
      lpStatus: services.lpStatus,
      infoStatus: services.infoStatus,
    })
    .from(services)
    .orderBy(services.sortOrder);

  return bizRows.map((biz) => ({
    slug: biz.slug,
    hasLP: biz.lpStatus === "published",
    hasInfo: biz.infoStatus === "published",
    services: svcRows
      .filter((s) => s.businessId === biz.id)
      .map((s) => ({
        slug: s.slug,
        hasLP: s.lpStatus === "published",
        hasInfo: s.infoStatus === "published",
      })),
  }));
}

// ─── Admin query functions (all statuses) ────────────────────

export type AdminService = Service & {
  lpStatus: PageStatus;
  infoStatus: PageStatus;
};

export type AdminBusiness = Business & {
  id: string;
  status: "demo" | "active" | "paused" | "churned";
  lpStatus: PageStatus;
  infoStatus: PageStatus;
  services: AdminService[];
};

function toAdminService(row: ServiceRow): AdminService {
  return {
    ...toService(row),
    lpStatus: row.lpStatus as PageStatus,
    infoStatus: row.infoStatus as PageStatus,
  };
}

function toAdminBusiness(
  row: BusinessRow,
  serviceRows: ServiceRow[],
): AdminBusiness {
  return {
    ...toBusiness(row, serviceRows),
    id: row.id,
    status: row.status as "demo" | "active" | "paused" | "churned",
    lpStatus: row.lpStatus as PageStatus,
    infoStatus: row.infoStatus as PageStatus,
    services: serviceRows.map(toAdminService),
  };
}

export async function getAllBusinessesAdmin(): Promise<AdminBusiness[]> {
  if (!hasDb) return [];

  const bizRows = await getDb().select().from(businesses);
  const svcRows = await getDb()
    .select()
    .from(services)
    .orderBy(services.sortOrder);

  return bizRows.map((biz) =>
    toAdminBusiness(
      biz,
      svcRows.filter((s) => s.businessId === biz.id),
    ),
  );
}

export async function getBusinessBySlugAdmin(
  slug: string,
): Promise<AdminBusiness | undefined> {
  if (!hasDb) return undefined;

  const [bizRow] = await getDb()
    .select()
    .from(businesses)
    .where(eq(businesses.slug, slug))
    .limit(1);
  if (!bizRow) return undefined;

  const svcRows = await getDb()
    .select()
    .from(services)
    .where(eq(services.businessId, bizRow.id))
    .orderBy(services.sortOrder);

  return toAdminBusiness(bizRow, svcRows);
}
