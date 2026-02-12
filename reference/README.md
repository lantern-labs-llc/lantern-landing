# Reference Designs

These are the source-of-truth HTML designs for Lantern business pages. They were designed to match the aesthetic of wellroomva.com (the client's existing Squarespace site).

## Files

- `info-page.html` — Machine-optimized page (for AI chatbots/crawlers). Dense facts, schema markup, no conversion elements.
- `landing-page.html` — Human-optimized page (for conversion). Perk-forward, mobile-first, minimal scroll.

## How to use these

Update the existing React/Next.js components to match these designs exactly. The HTML structure, CSS, typography, colors, spacing, and layout should all carry over.

### Design system (shared across both pages)

```css
/* Fonts — load from Google Fonts */
font-family: 'Cormorant Garamond', serif;  /* headings */
font-family: 'Jost', sans-serif;           /* body, weight 300 default */

/* Colors */
--cream: #FAF7F2;
--cream-deep: #F3EDE3;
--copper: #B8896A;
--copper-light: #D4A882;
--copper-dark: #9A7259;
--copper-glow: rgba(184, 137, 106, 0.1);
--text: #2C2C2C;
--text-light: #5A5A5A;
--text-muted: #8A8A8A;
--border: #E5DED5;
--white: #FFFFFF;
--sage: #E8EDE5;
--sage-dark: #D4DDD0;
```

### Info page key patterns
- Container max-width: 740px
- Fact block: white card, 2-column grid on desktop, 1-column on mobile
- Pricing: 2x2 grid of cards
- Details: semantic table layout (label | value)
- FAQ: accordion with +/− toggle
- Reviews: labeled by decision criteria ("On the experience", "On making it a routine")
- About block: sage green (#E8EDE5) background
- No CTAs, no perk codes, no sticky elements

### Landing page key patterns
- Container max-width: 600px (narrower)
- Hero: centered, headline leads with perk ("Your first visit, 15% off")
- Perk card: cream-deep background, code displayed prominently
- Buttons: copper primary (#B8896A), outlined secondary
- Trust row: 3-column grid with icon/title/detail
- Steps: numbered circles with copper border
- Service cards: 2x2 grid, each with individual booking link
- Sticky mobile CTA: fixed bottom bar, shows after scrolling past hero (mobile only)
- Review: single centered blockquote

### Schema markup
Both pages include JSON-LD in the `<head>`. The info page has full LocalBusiness + Service + FAQPage schemas. The landing page has minimal WebPage + Offer schema. Carry these into the Next.js page components using `<script type="application/ld+json">` in the head via Next.js metadata.

### Content notes
- Pricing marked as ~$35 / ~$55 are placeholders — pull from business data
- Phone number on landing page should be the tracked Twilio number in production
- Booking links should route through Lantern redirect tracker in production
- Perk code comes from the business data (promoCode field)
