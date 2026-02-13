import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getDb } from "@/db/index";
import { waitlist } from "@/db/schema";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  businessName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1).max(10),
  phone: z.string().optional().default(""),
  note: z.string().optional().default(""),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    const db = getDb();
    await db.insert(waitlist).values({
      name: parsed.name,
      email: parsed.email,
      businessName: parsed.businessName,
      city: parsed.city,
      state: parsed.state,
      phone: parsed.phone || null,
      note: parsed.note || null,
    });

    // Send notification email (best-effort — don't fail the request)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Lantern <notifications@lantern.llc>",
          to: "waitlist@lantern.llc",
          subject: `Waitlist: ${parsed.businessName} — ${parsed.name}`,
          html: `
            <h2>New waitlist submission</h2>
            <table style="border-collapse:collapse">
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Name</td><td>${parsed.name}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Email</td><td>${parsed.email}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Business</td><td>${parsed.businessName}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Location</td><td>${parsed.city}, ${parsed.state}</td></tr>
              ${parsed.phone ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">Phone</td><td>${parsed.phone}</td></tr>` : ""}
              ${parsed.note ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">Note</td><td>${parsed.note}</td></tr>` : ""}
            </table>
          `,
        });
      } catch (emailErr) {
        console.error("Resend email error:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 },
      );
    }
    console.error("Waitlist submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
