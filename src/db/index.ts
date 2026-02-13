import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy connection — only connects when a query is actually executed.
// This allows `next build` to succeed without DATABASE_URL set
// (static pages that don't call DB queries still build fine).

type Database = ReturnType<typeof drizzle<typeof schema>>;

let _db: Database | null = null;

export function getDb(): Database {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add it to .env.local (see .env.local.example).",
      );
    }
    const client = postgres(url, { prepare: false });
    _db = drizzle(client, { schema });
  }
  return _db;
}
