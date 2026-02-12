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
}

export interface DetailsRow {
  label: string;
  value: string;
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
  facts?: DetailsRow[];
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
}
