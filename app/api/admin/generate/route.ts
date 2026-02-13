import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// ─── Types ───────────────────────────────────────────────────

type PlaceDetails = {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  ratingCount: number;
  googleMapsUrl: string;
  hours: string[];
  location: { latitude: number; longitude: number } | null;
  types: string[];
};

// ─── Helpers ─────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseAddress(formatted: string) {
  // Google format: "123 Main St, City, ST 12345, USA"
  const parts = formatted.split(",").map((p) => p.trim());
  const address = parts[0] || "";
  const city = parts[1] || "";
  // "ST 12345" or "ST"
  const stateZipPart = parts[2] || "";
  const stateZipMatch = stateZipPart.match(/^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$/);
  const state = stateZipMatch?.[1] || stateZipPart.split(" ")[0] || "";
  const zip = stateZipMatch?.[2] || "";
  return { address, city, state, zip };
}

function parseHours(hourStrings: string[]) {
  const dayMap: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  return hourStrings.map((line) => {
    // "Monday: 9:00 AM – 5:00 PM" or "Monday: Closed"
    const [dayPart, ...rest] = line.split(":");
    const dayFull = dayPart?.trim() || "";
    const day = dayMap[dayFull] || dayFull;
    const timeStr = rest.join(":").trim();

    if (!timeStr || timeStr.toLowerCase() === "closed") {
      return { day, open: "", close: "", closed: true };
    }

    // "9:00 AM – 5:00 PM"
    const times = timeStr.split(/\s*[–-]\s*/);
    return {
      day,
      open: times[0]?.trim() || "",
      close: times[1]?.trim() || "",
    };
  });
}

async function scrapeWebsite(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LanternBot/1.0; +https://lantern.so)",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return "";
    const html = await res.text();

    // Strip scripts, styles, and tags to get visible text
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#?\w+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return text.slice(0, 8000);
  } catch {
    return "";
  }
}

// ─── Claude prompt ───────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert copywriter creating business listing content. You will receive data about a business from Google Places and their website. Generate compelling, professional content.

Return ONLY a valid JSON object (no markdown fences, no explanation) with these fields:

{
  "tagline": "Short compelling tagline (under 10 words)",
  "description": "2-3 sentence business description",
  "heroSubtitle": "Short subtitle for landing page hero section (under 15 words)",
  "category": "Business category (e.g. 'Wellness & Spa', 'Dental', 'Fitness')",
  "aboutSections": ["paragraph1", "paragraph2", "paragraph3"],
  "differentiators": [{"title": "...", "text": "..."}],
  "infoFacts": [{"label": "...", "value": "..."}],
  "infoFaqs": [{"question": "...", "answer": "..."}],
  "faqs": [{"question": "...", "answer": "..."}],
  "trustSignals": [{"icon": "shield|star|award|clock|heart|check", "title": "...", "detail": "..."}],
  "howItWorks": [{"title": "...", "description": "..."}],
  "owner": "Owner/practitioner name if found, or empty string",
  "ownerTitle": "Title/role if found, or null",
  "ownerCredentials": "Credentials if found, or null",
  "parking": "Parking info if found, or null",
  "founded": "Year founded if found, or null",
  "bookingUrl": "Online booking URL if found on website, or null"
}

Guidelines:
- aboutSections: 3-4 paragraphs about the business, warm and professional
- differentiators: 3-4 unique selling points with short title and 1-2 sentence text
- infoFacts: 4-6 key facts as label/value pairs (e.g. "Established" / "2015")
- infoFaqs: 5-8 specific questions customers would ask, with helpful answers
- faqs: 3-5 general business FAQs (hours, parking, booking, etc.)
- trustSignals: 3-4 trust indicators. Icon must be one of: shield, star, award, clock, heart, check
- howItWorks: exactly 3 steps for first-time visitors
- Extract owner/practitioner info from website text if available
- Be factual — don't invent specific claims not supported by the data`;

function buildUserPrompt(place: PlaceDetails, websiteText: string): string {
  let prompt = `Business: ${place.name}
Address: ${place.address}
Phone: ${place.phone || "Not listed"}
Website: ${place.website || "None"}
Rating: ${place.rating ?? "N/A"} (${place.ratingCount} reviews)
Google types: ${place.types.join(", ")}
Hours:
${place.hours.length > 0 ? place.hours.join("\n") : "Not available"}`;

  if (websiteText) {
    prompt += `\n\nWebsite content:\n${websiteText}`;
  }

  return prompt;
}

// ─── Route handler ───────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 500 },
      );
    }

    const place: PlaceDetails = await request.json();

    // Parse structured fields from Google data
    const { address, city, state, zip } = parseAddress(place.address);
    const hours = parseHours(place.hours);
    const slug = slugify(place.name);

    // Scrape website if available
    let websiteText = "";
    if (place.website) {
      websiteText = await scrapeWebsite(place.website);
    }

    // Call Claude
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: buildUserPrompt(place, websiteText) },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from AI" },
        { status: 500 },
      );
    }

    // Parse AI-generated content (strip markdown fences if present)
    let aiContent;
    try {
      const raw = textBlock.text
        .replace(/^```(?:json)?\s*\n?/i, "")
        .replace(/\n?```\s*$/i, "")
        .trim();
      aiContent = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: textBlock.text },
        { status: 500 },
      );
    }

    // Merge Google Places data + AI content into a business draft
    const draft = {
      slug,
      name: place.name,
      tagline: aiContent.tagline || "",
      description: aiContent.description || "",
      heroSubtitle: aiContent.heroSubtitle || "",
      category: aiContent.category || "",
      owner: aiContent.owner || "",
      ownerTitle: aiContent.ownerTitle || null,
      ownerCredentials: aiContent.ownerCredentials || null,
      address,
      city,
      state,
      zip,
      phone: place.phone || "",
      email: null,
      website: place.website || null,
      bookingUrl: aiContent.bookingUrl || null,
      latitude: place.location?.latitude ?? null,
      longitude: place.location?.longitude ?? null,
      rating: place.rating,
      reviewCount: place.ratingCount,
      hours,
      parking: aiContent.parking || null,
      founded: aiContent.founded || null,
      aboutSections: aiContent.aboutSections || [],
      differentiators: aiContent.differentiators || [],
      infoFacts: aiContent.infoFacts || [],
      infoFaqs: aiContent.infoFaqs || [],
      faqs: aiContent.faqs || [],
      trustSignals: aiContent.trustSignals || [],
      howItWorks: aiContent.howItWorks || [],
      // Empty arrays for fields to be filled later
      reviews: [],
      services: [],
      lpServiceCards: [],
      lpTrustItems: [],
      lpBookingSteps: [],
    };

    return NextResponse.json(draft);
  } catch (err) {
    console.error("Generate route error:", err);

    // Surface friendly message for known Anthropic errors
    if (
      err instanceof Anthropic.APIError &&
      err.message.includes("credit balance is too low")
    ) {
      return NextResponse.json(
        {
          error:
            "Anthropic needs recharge. Call Jay.",
        },
        { status: 402 },
      );
    }

    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
