export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PromoCode {
  code: string;
  description: string;
  discount: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date?: string;
  source?: string;
  label?: string;
  service?: string;
}

export interface TrustSignal {
  icon: string;
  title: string;
  detail: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface PricingItem {
  name: string;
  price: string;
  description?: string;
  featured?: boolean;
  tag?: string;
}

export interface DetailsRow {
  label: string;
  value: string;
}

export interface FactCard {
  label: string;
  value: string;
}

export interface ServiceListItem {
  name: string;
  slug: string;
  details: string;
  startingPrice: string;
}

export interface ServiceCategory {
  name: string;
  services: ServiceListItem[];
}

export interface ExpectItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  duration?: string;
  price?: string;
  isPrivate?: boolean;
  bookingUrl?: string;
  benefits: string[];
  faqs: FAQ[];
  pricing?: PricingItem[];
  whatToExpect?: DetailsRow[];
  commonReasons?: string[];
  beforeAfter?: { before: string; after: string };
  facts?: FactCard[];
  // LP-specific fields
  lpExpectItems?: ExpectItem[];
  lpBenefits?: BenefitItem[];
  lpReviews?: Review[];
  lpFaqs?: FAQ[];
  lpTrustItems?: { top: string; bottom: string }[];
  lpBenefitLabel?: string;
  lpReviewLabel?: string;
  lpFaqLabel?: string;
  lpBenefitSectionTitle?: string;
  // Info page fields
  infoReviews?: Review[];
  educationalSections?: { heading: string; paragraphs: string[] }[];
  comparisonTable?: { headers: string[]; rows: string[][] };
  researchBottomLine?: string;
  researchSources?: string;
  whatsIncluded?: { title: string; description: string }[];
  candidacy?: { goodFor: string; consultFirst: string; safety?: string };
  // Meta
  metaTitle?: string;
  metaDescription?: string;
}

export interface LPServiceCard {
  name: string;
  description: string;
  price: string;
  bookingUrl: string;
  tag?: string;
}

export interface PractitionerInfo {
  name: string;
  fullTitle: string;
  credentials: string;
  bio: string;
}

export interface Business {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  owner: string;
  ownerTitle?: string;
  ownerCredentials?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  hours: BusinessHours[];
  services: Service[];
  promoCode?: PromoCode;
  faqs: FAQ[];
  reviews: Review[];
  rating?: number;
  reviewCount?: number;
  favicon?: string;
  latitude?: number;
  longitude?: number;
  trustSignals?: TrustSignal[];
  howItWorks?: HowItWorksStep[];
  heroSubtitle?: string;
  parking?: string;
  founded?: string;
  // Service categories for info pages
  serviceCategories?: ServiceCategory[];
  // LP-specific
  lpServiceCards?: LPServiceCard[];
  lpReviews?: Review[];
  lpTrustItems?: { value: string; label: string }[];
  lpBookingSteps?: { step: string; title: string; description: string }[];
  practitioner?: PractitionerInfo;
  bundlesUrl?: string;
  externalProfiles?: { platform: string; rating: string; reviewCount?: string; url: string }[];
  category?: string;
  cname?: string;
  cnameStatus?: "pending" | "active" | "error";
  // Info page specific
  infoFacts?: FactCard[];
  infoReviews?: Review[];
  infoFaqs?: FAQ[];
  aboutSections?: string[];
  differentiators?: { title: string; text: string }[];
}
