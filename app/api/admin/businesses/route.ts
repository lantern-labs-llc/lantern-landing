import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db/index";
import { businesses } from "@/db/schema";
import { businessDraftSchema, toInsertValues } from "./schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = businessDraftSchema.parse(body);

    const db = getDb();
    const [row] = await db
      .insert(businesses)
      .values(toInsertValues(parsed))
      .returning({ id: businesses.id, slug: businesses.slug });

    return NextResponse.json({ id: row.id, slug: row.slug });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 },
      );
    }
    console.error("Save business error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
