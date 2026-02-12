# Lantern — Claude Code Implementation Brief
## Well Room: 4-Page System

---

## Overview

We've designed and prototyped 4 page types that form Lantern's core product. Each client gets a business-level pair (info + landing) and a service-level pair for each service. These need to be implemented in the existing Next.js app on Vercel.

**URL Structure (lantern.llc domain for now — client subdomains later):**

```
/b/[businessSlug]/info                    → Business Info Page (B-IP)
/b/[businessSlug]                         → Business Landing Page (B-LP)
/b/[businessSlug]/[serviceSlug]/info      → Service Info Page (S-IP)
/b/[businessSlug]/[serviceSlug]           → Service Landing Page (S-LP)
```

**Well Room URLs:**
```
/b/well-room/info                         → Business Info Page
/b/well-room                              → Business Landing Page
/b/well-room/infrared-sauna/info          → Service Info Page
/b/well-room/infrared-sauna              → Service Landing Page
```

---

## Architecture Notes

### Info Pages (B-IP, S-IP)
- **Static HTML. No JavaScript required.** Must be fully readable by AI crawlers with JS disabled.
- Server-rendered by Next.js, but the output should be plain semantic HTML + CSS.
- No React hydration needed — these are content pages, not interactive apps.
- JSON-LD schema in `<head>` is critical — chatbots parse this structured data.
- Target page weight: under 50KB.
- System font stack (no web fonts to load).

### Landing Pages (B-LP, S-LP)
- React components with client-side interactivity (coupon copy, FAQ accordion, review carousel, scroll animations).
- Server-side rendered for initial load (important for any crawlers that do follow LP links).
- Web fonts: Cormorant Garamond + DM Sans (Google Fonts).
- Mobile-first responsive.

### Key Principle
Info pages feed landing pages. Every "book" or "learn more" link on an info page points to the corresponding landing page. Landing pages handle conversion + attribution (coupon code tracking).

---

## File Reference

All 4 prototypes are included in this handoff:

| File | Type | Format | Notes |
|------|------|--------|-------|
| `well-room-info.html` | B-IP | Static HTML | Production-ready content, just needs Next.js route wrapper |
| `well-room-lp.jsx` | B-LP | React component | Needs 3 asset swaps (logo, photo, map) |
| `well-room-sauna-info.html` | S-IP | Static HTML | Production-ready content, just needs Next.js route wrapper |
| `sauna-lp.jsx` | S-LP | React component | Needs 3 asset swaps (photo, map, logo) |

---

## Implementation Details by Page

### 1. Business Info Page (B-IP)
**File:** `well-room-info.html`
**Route:** `/b/well-room/info`

**What to do:**
- Wrap the HTML content in a Next.js page component that renders server-side.
- The `<style>` block and all content in `<body>` should render as-is.
- The two `<script type="application/ld+json">` blocks in `<head>` must be included in the page's `<head>` (use Next.js `<Head>` component or metadata API).
- No client-side JS needed. No React hydration.
- Set appropriate cache headers (can be aggressive — content updates infrequently).

**Content is complete.** No asset swaps needed. This page has no images by design.

---

### 2. Business Landing Page (B-LP)
**File:** `well-room-lp.jsx`
**Route:** `/b/well-room`

**What to do:**
- This is a React component — integrate into Next.js page routing.
- Needs server-side rendering for initial paint.

**3 asset swaps needed:**

1. **Logo** — Replace the styled text "WELL ROOM" in the hero with an `<img>` tag:
   - Source: `WellRoom_WebsiteLogo_Copper.png` from wellroomva.com (download and host in our static assets)
   - The placeholder is the `<div>` with `fontFamily: 'Cormorant Garamond'`, `fontSize: '30px'`, `letterSpacing: '10px'`, text "WELL ROOM"
   - Replace with: `<img src="/assets/well-room/logo.png" alt="Well Room" style={{ height: '40px' }} />`

2. **Photo** — In the "About Megan" section, replace the placeholder:
   - The placeholder is the `<div>` with `width: '180px'`, `height: '220px'`, background gradient, and 📷 emoji
   - Replace with: `<img src="/assets/well-room/hero-photo.jpg" alt="Well Room studio" style={{ width: '180px', height: '220px', objectFit: 'cover', borderRadius: '12px' }} />`
   - Source image: Download `WellRoom-725.jpg` from Well Room's Squarespace CDN (Megan can also provide directly)

3. **Map** — Replace the stylized map placeholder in the location section:
   - The placeholder is the `<div>` with `height: '180px'`, background gradient, and fake grid lines
   - Replace with either:
     - A Google Static Maps API image: `<img src="https://maps.googleapis.com/maps/api/staticmap?center=38.0337,-78.4938&zoom=16&size=700x180&markers=color:0xB8845A|38.0337,-78.4938&key=YOUR_KEY" />`
     - Or an embedded Google Map `<iframe>`
   - The entire map card should remain wrapped in the existing `<a>` tag linking to Google Maps directions

**Promo system:**
- The promo code ("LANTERN15") and promo text ("Use code LANTERN15 for 15% off your first visit") appear in 3 locations on this page: top bar, coupon card, final CTA section.
- These should eventually be driven by a CMS field so the client can update once and it propagates everywhere. For now, hardcoded is fine.

**Color palette (used across all LP pages):**
```
Copper accent:    #B8845A
Body text:        #635B56
Dark text:        #2C2825
Muted text:       #978F89
Section bg:       #FAF9F5
Borders:          #EDE5DA
```

---

### 3. Service Info Page (S-IP)
**File:** `well-room-sauna-info.html`
**Route:** `/b/well-room/infrared-sauna/info`

**What to do:**
- Same approach as B-IP: wrap in Next.js page, render server-side, no client JS.
- Two JSON-LD blocks in `<head>` (Service schema + FAQPage schema).
- No images, no asset swaps.

**Content is complete.** Includes both educational content (general infrared sauna info with cited research) and Well Room-specific details.

**Navigation:**
- Header links back to B-IP: `← All Well Room services`
- Booking callout links to S-LP: `/b/well-room/infrared-sauna`
- Bottom "All services" links to B-IP: `/b/well-room/info`

---

### 4. Service Landing Page (S-LP)
**File:** `sauna-lp.jsx`
**Route:** `/b/well-room/infrared-sauna`

**What to do:**
- React component, same integration approach as B-LP.

**3 asset swaps needed:**

1. **Logo** — Same swap as B-LP (same logo image, same treatment).

2. **Photo** — In the "What to expect" section, replace the placeholder:
   - The placeholder is the `<div>` with `width: '240px'`, `minHeight: '300px'`, background gradient, and 📷 emoji
   - Replace with: `<img src="/assets/well-room/sauna-room.jpg" alt="Well Room infrared sauna room" style={{ width: '240px', minHeight: '300px', objectFit: 'cover', borderRadius: '12px' }} />`
   - Source: Need a sauna room photo from Megan

3. **Map** — Same approach as B-LP map swap.

**Promo system:** Same code/text as B-LP, appears in 3 locations (top bar, below hero CTAs, final CTA).

---

## Cross-Page Consistency Checks

These elements must be identical across all pages for a given business:

| Element | Value (Well Room) |
|---------|-------------------|
| Promo code | LANTERN15 |
| Promo text | Use code LANTERN15 for 15% off your first visit |
| Phone | (434) 933-6100 |
| Address | 134 10th Street NW, Charlottesville, VA 22903 |
| Hours | Mon–Fri 10am–4pm |
| Booking URL (business) | /b/well-room |
| Booking URL (sauna) | /b/well-room/infrared-sauna |
| Rating | 4.9 ★ (150+ reviews) |
| Color palette | See above |
| Fonts (LPs only) | Cormorant Garamond + DM Sans |

---

## Navigation Between Pages

```
B-IP (/b/well-room/info)
  ├── "Book at Well Room →" button → B-LP (/b/well-room)
  ├── Each service row → S-IP (/b/well-room/[serviceSlug]/info)
  ├── Website → wellroomva.com (external)
  └── Review links → Google, Yelp (external)

B-LP (/b/well-room)
  ├── Service cards → External booking (wellroomva.as.me)
  ├── "All services on wellroomva.com" → wellroomva.com (external)
  └── Footer: wellroomva.com, directions, phone

S-IP (/b/well-room/infrared-sauna/info)
  ├── "Book Infrared Sauna →" button → S-LP (/b/well-room/infrared-sauna)
  ├── "← All Well Room services" → B-IP (/b/well-room/info)
  ├── "All services" → B-IP (/b/well-room/info)
  ├── Website → wellroomva.com (external)
  └── Review links → Google, Yelp (external)

S-LP (/b/well-room/infrared-sauna)
  ├── "Book Infrared Sauna" → External booking (wellroomva.as.me/sauna category)
  ├── "All services" → B-LP (/b/well-room)
  ├── Bundles link → wellroomva.com/bundles-packages (external)
  └── Footer: wellroomva.com, directions, phone
```

---

## Future: Subdomain Mapping

When a client (e.g., Megan) is ready to CNAME `info.wellroomva.com` to our Vercel deployment, the URL mapping becomes:

```
info.wellroomva.com/                          → /b/well-room/info
info.wellroomva.com/welcome                   → /b/well-room
info.wellroomva.com/infrared-sauna            → /b/well-room/infrared-sauna/info
info.wellroomva.com/infrared-sauna/welcome    → /b/well-room/infrared-sauna
```

This is a Vercel custom domain + Next.js middleware rewrite — not needed for the demo, but the routing should be designed to support it later.

---

## Assets to Collect from Megan

1. **Logo file** — `WellRoom_WebsiteLogo_Copper.png` (or original vector)
2. **Hero/studio photo** — The WellRoom-725.jpg image or similar welcoming interior shot
3. **Sauna room photo** — Interior of the infrared sauna room
4. **Confirmation of pricing** — Verify the ~$35 / ~$45 sauna pricing and other service prices
5. **Google Maps API key** — For static map images (or use an existing key)
6. **Review permission** — Confirm we can quote the Google reviews shown on the pages

---

## What's Done vs. What's Next

### Done (in this handoff):
- [x] B-LP design + content (well-room-lp.jsx)
- [x] B-IP design + content (well-room-info.html)
- [x] S-LP design + content for infrared sauna (sauna-lp.jsx)
- [x] S-IP design + content for infrared sauna (well-room-sauna-info.html)

### Next (after CC implements these):
- [ ] Content for remaining 15 service info pages
- [ ] Content for remaining 15 service landing pages
- [ ] Admin CMS for managing business/service content
- [ ] Promo code system (business-wide default + per-service override)
- [ ] Subdomain mapping middleware
- [ ] Analytics / coupon redemption tracking
