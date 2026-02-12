import * as fs from "fs";
import * as path from "path";
import { getAllBusinesses } from "../src/data/businesses/index";

const ROOT = path.resolve(__dirname, "..");

// Load .env.local
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

const API_KEY = process.env.GOOGLE_MAPS_STATIC_API_KEY;
if (!API_KEY) {
  console.error("Missing GOOGLE_MAPS_STATIC_API_KEY in .env.local");
  process.exit(1);
}

const businesses = getAllBusinesses();
const outDir = path.join(ROOT, "public/images/maps");
fs.mkdirSync(outDir, { recursive: true });

// Warm/muted map styles matching the site aesthetic
const styles = [
  "style=feature:all|element:geometry|color:0xf5f1eb",
  "style=feature:water|element:geometry|color:0xe8e0d4",
  "style=feature:road|element:geometry|color:0xfaf8f5",
  "style=feature:road|element:geometry.stroke|color:0xe0d8cc",
  "style=feature:road.highway|element:geometry|color:0xf0e8dc",
  "style=feature:poi|element:labels|visibility:off",
  "style=feature:poi.park|element:geometry|color:0xe8e4d8",
  "style=feature:transit|visibility:off",
  "style=feature:administrative|element:labels.text.fill|color:0x9e9488",
  "style=feature:road|element:labels.text.fill|color:0x8b8580",
].join("&");

async function main() {
  for (const biz of businesses) {
    if (!biz.latitude || !biz.longitude) {
      console.log(`Skipping ${biz.slug} — no coordinates`);
      continue;
    }

    const outFile = path.join(outDir, `${biz.slug}.png`);

    // Copper-toned marker
    const marker = `markers=color:0xC49A6C|${biz.latitude},${biz.longitude}`;

    const url =
      `https://maps.googleapis.com/maps/api/staticmap?` +
      `center=${biz.latitude},${biz.longitude}` +
      `&zoom=16&size=700x300&scale=2&maptype=roadmap` +
      `&${marker}&${styles}&key=${API_KEY}`;

    console.log(`Fetching map for ${biz.slug}...`);
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`  Failed: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.error(`  ${text.slice(0, 200)}`);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outFile, buffer);
    console.log(`  Saved ${outFile} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log("Done.");
}

main();
