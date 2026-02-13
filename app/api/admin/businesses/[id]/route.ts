import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/index";
import { businesses } from "@/db/schema";
import { businessDraftSchema, toInsertValues } from "../schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = businessDraftSchema.parse(body);

    const db = getDb();
    const values = toInsertValues(parsed);

    const [row] = await db
      .update(businesses)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(businesses.id, id))
      .returning({ id: businesses.id, slug: businesses.slug });

    if (!row) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ id: row.id, slug: row.slug });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 },
      );
    }
    console.error("Update business error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
