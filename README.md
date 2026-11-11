# HillyBilly Foods — website

Bilingual (DE primary, EN) marketing site for HillyBilly Foods, a multi-concept street food and catering brand. Its main job is to turn visitors into qualified catering requests.

## Stack

| | |
|---|---|
| Framework | React 19 + Vite 6 + TypeScript |
| Styling | Tailwind CSS v4 (tokens in `src/index.css`) |
| Components | **Animate UI** (`@animate-ui/react`) — the only component library |
| Icons | **Animate UI Icons** (`src/components/animate-ui/icons`) — the only icon set |
| Routing | React Router 7, localised URLs (`/de/foodkonzepte`, `/en/food-concepts`) |
| Fonts | Bricolage Grotesque + Caveat Brush, **self-hosted** (no Google Fonts requests → GDPR) |

Animate UI parts in use: Button, Accordion, Drawer (mobile menu), Dialog title, Radio Group, Checkbox, Progress, Tilt, and `AnimateIcon` for hover-animated icons. Icons were copied from the official Animate UI registry, the way its CLI installs them. To add one, copy it from the Animate UI icons registry into that folder and export it from `index.ts`.

## Scripts

```bash
npm install --legacy-peer-deps   # Animate UI lists optional peers we don't use
npm run dev                      # local development
npm run build                    # production build + prerender every page + sitemap → dist/
npm run build:preview            # one self-contained HTML file for client review → dist-preview/
```

`npm run build` renders all 48 URLs to static HTML (titles, meta, hreflang, JSON-LD and full page content). Search engines and link previews get real content without running JavaScript; React then hydrates in the browser.

## Editing content (no layout changes needed)

Everything editable lives in `src/content/` and is typed, so a missing translation fails the build.

- **New food concept:** add an entry to `concepts.ts`. This creates its card, detail page, form option, footer link, sitemap entry and structured data automatically. Use `status: 'new'` for the "Neu" sticker and `'archived'` to hide a concept without deleting it. If it has no photo, it gets a typographic card instead of a stock image.
- **Photos:** add a `.webp` to `src/assets/img/` and register it with DE/EN alt text in `media.ts`.
- **Public dates:** add entries to `locations.ts`. Past dates hide themselves.
- **Reviews:** add them to `testimonials.ts` with `permission: true` only once written consent exists. The block stays hidden until then.
- **FAQ, occasions, business details:** `faq.ts`, `occasions.ts`, `site.ts`.

To move to a hosted CMS later (Sanity, Storyblok, Payload…), these files already describe the content model one-to-one.

## Catering form

The form has four steps with validation per step, a named error summary, and focus moved to each new step heading. It also includes:

- a progress bar, and a draft saved in `sessionStorage`
- prefill from `?concept=<slug>` and `?event=<type>`
- concept-specific power warnings (Corndogs = 32A; the others are "we confirm")
- a full summary with "Change" links, privacy consent (required) and a marketing opt-in (**unchecked by default**)
- a honeypot field against spam bots
- an optional WhatsApp handoff that only adds event details if the visitor ticks the box. Name and phone are never included.

It POSTs JSON to `VITE_FORM_ENDPOINT`. **The endpoint must handle:**
1. the notification email to HillyBilly with all fields
2. the confirmation email to the customer
3. server-side spam checks (rate limit, and optionally Friendly Captcha, which is GDPR-friendly)
4. retention and deletion that match the privacy policy, keeping `marketing` consent separately with a timestamp

Without an endpoint the form runs in **demo mode**: it shows a success page with a yellow "nothing was sent" notice.

## Hosting

Any static host works (Netlify, Vercel, Cloudflare Pages, nginx). The host must serve `/de/kontakt` from `dist/de/kontakt/index.html`. Netlify, Vercel and Cloudflare do this by default; on nginx use `try_files $uri $uri/index.html =404;`. Redirect `/` to `/de` with a 301 at host level if possible. `dist/404.html` is the not-found page.

## Launch checklist

**Confirm with HillyBilly (marked `VERIFY` in `src/content/site.ts`):**
- [ ] Final domain → set `VITE_SITE_URL`, and update the `Sitemap:` line in `public/robots.txt`
- [ ] Catering phone / WhatsApp Business number (currently the number on the Corndogs truck)
- [ ] Catering email (currently `info@hillybillycorndogs.com`, partly read off a truck photo)
- [ ] Service area (currently "Baden-Württemberg und Umgebung")
- [ ] Official HillyBilly Foods vector logo → replace `src/components/layout/Logo.tsx` (currently a typographic stand-in)

**Content:**
- [ ] Approved company story for `About.tsx` (current text is a draft based on the photos)
- [ ] Menus, dietary/allergen details and photos for Korean Streetfood, American Burgers and Mac & Cheese (marked "Neu"; dishes are taken from the brief)
- [ ] Confirm every vegetarian tag per dish. Halal, vegan and gluten-free tags are deliberately **not** set until the kitchen confirms them
- [ ] Power requirements per concept (only Corndogs = 32A is confirmed)
- [ ] Prices: only publish once the basis (per person / minimum spend / VAT / travel) is approved — `Dish.price` is ready
- [ ] Verified numbers for the trust strip (years trading, events served, reply time); none are shown yet on purpose
- [ ] Testimonials with written permission; Instagram handles for Momolaya

**Legal (must be lawyer-reviewed):**
- [ ] Impressum and Datenschutzerklärung — templates with `[ ]` placeholders in `src/pages/Legal.tsx`
- [ ] Consent and marketing opt-in wording in the form

**Before switching on analytics:** add a consent banner and load analytics only after opt-in. The site currently sets no cookies.

## Brief acceptance checklist

- [x] No fixed "four trucks" wording in the hero, footer or positioning. The concept grid always ends with an open "More coming soon" card
- [x] Staff can add a concept without layout changes (one data entry)
- [x] The form sends every selected field (verified end-to-end; needs the live endpoint)
- [x] Only real HillyBilly photos are used. The AI mockups were treated as references only
- [x] DE and EN are complete (enforced by types), with localised URLs, hreflang and a language switch that stays on the same page
- [x] Every CTA leads somewhere real. Remaining placeholders exist only in the legal templates, by design
