import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "websiteUri",
  "rating",
  "userRatingCount",
  "regularOpeningHours",
  "googleMapsUri",
  "location",
  "types",
].join(",");

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ placeId: string }> },
) {
  const { placeId } = await params;

  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK,
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Places details error:", res.status, text);
    return NextResponse.json(
      { error: "Google API error" },
      { status: res.status },
    );
  }

  const place = await res.json();

  return NextResponse.json({
    placeId: place.id,
    name: place.displayName?.text ?? "",
    address: place.formattedAddress ?? "",
    phone: place.nationalPhoneNumber ?? place.internationalPhoneNumber ?? "",
    website: place.websiteUri ?? "",
    rating: place.rating ?? null,
    ratingCount: place.userRatingCount ?? 0,
    googleMapsUrl: place.googleMapsUri ?? "",
    hours:
      place.regularOpeningHours?.weekdayDescriptions ?? [],
    location: place.location ?? null,
    types: place.types ?? [],
  });
}
