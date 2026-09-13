# ISLAND SOL

Portable power stations and backup energy systems for homes and businesses in
The Bahamas. Conversion-focused Next.js storefront intended to run as a Wix
Headless frontend.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Data layer currently backed by local placeholder data (`src/lib/data/`)
  behind the same function signatures a real Wix Stores/CMS integration
  would use — see "Connecting Wix Headless" below.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_WHATSAPP_NUMBER, etc.
npm run dev
```

## Project structure

- `src/app/` — routes (App Router): homepage, `/products`, `/products/[slug]`,
  `/power-calculator`, `/solutions`, `/how-it-works`, `/trade-in`, `/support`.
- `src/components/` — `ui/` primitives, `layout/` (header/footer/mobile nav),
  `home/` (homepage sections), `calculator/`, `product/`, `forms/`, `whatsapp/`.
- `src/lib/types/` — domain models (Product, ProductTier, UseCase,
  Testimonial, FaqItem, calculator types, lead types) shaped to match what
  will become real Wix CMS/Stores collections.
- `src/lib/data/` — the current data source. Every exported function
  (`getProducts`, `getProductBySlug`, etc.) is the seam to swap for a real
  Wix SDK/REST call — keep the signatures, change the implementation.
- `src/lib/calculator/engine.ts` — pure power-recommendation logic.

## No fabricated content

Per brand guidelines, nothing here invents prices, specs, testimonials, or
warranty terms. Where real data doesn't exist yet, the UI shows an honest
placeholder state ("Coming soon", "Request pricing") instead. See
`isPlaceholder` flags and comments in `src/lib/data/`.

## Connecting Wix Headless

Not yet connected — this requires an interactive `npx @wix/cli login` (or
the self-managed headless quick start) under the project owner's own Wix
account. Once connected, replace the implementations in `src/lib/data/`
with real Wix SDK/REST calls; component code doesn't need to change.

## Environment variables

See `.env.example`. Notably `NEXT_PUBLIC_WHATSAPP_NUMBER` (currently a
placeholder, not a real number) and `NEXT_PUBLIC_SITE_URL` (used for
canonical URLs, sitemap, and structured data).
