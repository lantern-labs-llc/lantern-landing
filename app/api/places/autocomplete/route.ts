import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")?.trim();
  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const res = await fetch(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
      },
      body: JSON.stringify({
        input: query,
        includedPrimaryTypes: ["establishment"],
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Places autocomplete error:", res.status, text);
    return NextResponse.json(
      { error: "Google API error" },
      { status: res.status },
    );
  }

  const data = await res.json();
  const suggestions = (data.suggestions ?? [])
    .filter((s: Record<string, unknown>) => s.placePrediction)
    .map((s: { placePrediction: { placeId: string; text: { text: string }; structuredFormat: { mainText: { text: string }; secondaryText: { text: string } } } }) => ({
      placeId: s.placePrediction.placeId,
      name: s.placePrediction.structuredFormat.mainText.text,
      secondary: s.placePrediction.structuredFormat.secondaryText.text,
    }));

  return NextResponse.json(suggestions);
}
