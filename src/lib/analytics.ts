"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ─── Visitor ID (persistent across sessions) ──────────────────

function getVisitorId(): string {
  const key = "lantern_vid";
  let vid = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${key}=`))
    ?.split("=")[1];

  if (!vid) {
    vid = crypto.randomUUID();
    document.cookie = `${key}=${vid}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }
  return vid;
}

// ─── Source attribution from referrer / UTMs ──────────────────

interface Attribution {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  referrerUrl: string | null;
}

const REFERRER_MAP: Record<string, { source: string; medium: string }> = {
  "google.com": { source: "google", medium: "organic" },
  "bing.com": { source: "bing", medium: "organic" },
  "facebook.com": { source: "facebook", medium: "social" },
  "instagram.com": { source: "instagram", medium: "social" },
  "tiktok.com": { source: "tiktok", medium: "social" },
  "twitter.com": { source: "twitter", medium: "social" },
  "x.com": { source: "twitter", medium: "social" },
  "chatgpt.com": { source: "chatgpt", medium: "ai" },
  "chat.openai.com": { source: "chatgpt", medium: "ai" },
  "claude.ai": { source: "claude", medium: "ai" },
  "perplexity.ai": { source: "perplexity", medium: "ai" },
  "yelp.com": { source: "yelp", medium: "referral" },
};

function getAttribution(): Attribution {
  const url = new URL(window.location.href);
  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign");

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      referrerUrl: document.referrer || null,
    };
  }

  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      const host = ref.hostname.replace(/^www\./, "");
      const mapped = REFERRER_MAP[host];
      return {
        source: mapped?.source || host,
        medium: mapped?.medium || "referral",
        campaign: null,
        referrerUrl: document.referrer,
      };
    } catch {
      // invalid referrer URL
    }
  }

  return { source: "direct", medium: null, campaign: null, referrerUrl: null };
}

// ─── Device type ──────────────────────────────────────────────

function getDeviceType(): string {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

// ─── Session management ───────────────────────────────────────

let currentSessionId: string | null = null;
let currentBusinessId: string | null = null;

async function ensureSession(businessId: string): Promise<string | null> {
  if (!supabase) return null;
  if (currentSessionId && currentBusinessId === businessId)
    return currentSessionId;

  const visitorId = getVisitorId();
  const attribution = getAttribution();

  const { data, error } = await supabase
    .from("analytics_sessions")
    .insert({
      business_id: businessId,
      visitor_id: visitorId,
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
      referrer_url: attribution.referrerUrl,
      landing_url: window.location.pathname,
      user_agent: navigator.userAgent,
      device_type: getDeviceType(),
    })
    .select("id")
    .single();

  if (error) {
    console.warn("[analytics] session create failed:", error.message);
    return null;
  }

  currentSessionId = data.id;
  currentBusinessId = businessId;
  return currentSessionId;
}

// ─── Public API ───────────────────────────────────────────────

export type EventType =
  | "page_view"
  | "book_now_click"
  | "phone_click"
  | "phone_call"
  | "promo_copy"
  | "service_card_click"
  | "directions_click"
  | "scroll_depth";

export async function trackEvent(
  businessId: string,
  eventType: EventType,
  options?: {
    pagePath?: string;
    serviceSlug?: string;
    properties?: Record<string, unknown>;
  },
) {
  if (!supabase) return;

  const sessionId = await ensureSession(businessId);
  if (!sessionId) return;

  const { error } = await supabase.from("analytics_events").insert({
    session_id: sessionId,
    business_id: businessId,
    event_type: eventType,
    page_path: options?.pagePath ?? window.location.pathname,
    service_slug: options?.serviceSlug ?? null,
    properties: options?.properties ?? null,
  });

  if (error) {
    console.warn("[analytics] event track failed:", error.message);
  }
}
