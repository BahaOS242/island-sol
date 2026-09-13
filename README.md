# ISLAND SOL

Portable power stations and backup energy systems for homes and businesses in
The Bahamas. Conversion-focused Next.js storefront running on a real Wix
Headless CMS backend.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Content is CMS-driven: a real Wix Headless project backs the site with 14
  Wix Data collections (Products, Categories, Solutions, Hero, Trust Items,
  Use Cases, Benefits, FAQs, Testimonials, Promotions, Appliances, Site
  Settings, Navigation, and a private Product Internal collection). See
  "Connecting Wix Headless" below for how the frontend reads it.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — safe defaults are baked in, see below
npm run dev
```

## Project structure

- `src/app/` — routes (App Router): homepage, `/products`, `/products/[slug]`,
  `/power-calculator`, `/solutions`, `/how-it-works`, `/trade-in`, `/support`.
- `src/components/` — `ui/` primitives, `layout/` (header/footer/mobile nav),
  `home/` (homepage sections), `calculator/`, `product/`, `forms/`, `whatsapp/`.
- `src/lib/types/` — domain models (Product, Category, Solution, UseCase,
  Testimonial, FaqItem, calculator types, lead types) mirroring the CMS
  collections exactly.
- `src/lib/data/` — the data-fetching layer. Every exported function
  (`getProducts`, `getProductBySlug`, `getHeroConfig`, etc.) queries the
  live Wix Data collections via `src/lib/wix/client.ts`, with a hardcoded
  fallback if the CMS is unreachable so the site never crashes.
- `src/lib/wix/client.ts` — the only file that talks to Wix. Mints an
  anonymous visitor token (public client ID, no secret) and queries public
  Wix Data collections server-side only (`import "server-only"`).
- `src/lib/calculator/engine.ts` — pure power-recommendation logic; takes
  CMS-sourced appliance definitions as a parameter rather than importing
  them, so it stays usable from the client-side calculator component.

## No fabricated content

Per brand guidelines, nothing here invents prices, specs, testimonials, or
warranty terms. Where real data doesn't exist yet, the UI shows an honest
placeholder state ("Coming soon", "Request pricing") instead. See
`isPlaceholder` flags and comments in `src/lib/data/`.

## Connecting Wix Headless

Already connected. The ISLAND SOL Wix Headless project (`WIX_META_SITE_ID`)
and a public OAuth app (`WIX_CLIENT_ID`, client ID only — no secret is
used anywhere in this codebase) are live. `src/lib/wix/client.ts` mints
short-lived anonymous visitor tokens from that client ID and queries the
public collections directly — no server-side Wix credentials to manage.

Business content — products, prices, images, hero copy, FAQs, calculator
appliance assumptions, site settings (WhatsApp number, business name,
etc.) — is edited from the Wix dashboard's Content Manager, not in code.

Internal fields (supplier, cost, margin) live in a separate
`product-internal` collection with `read: ADMIN` permissions — it is
never queried from this app and has no public read access.

## Environment variables

See `.env.example`. Safe defaults matching the real ISLAND SOL Wix project
are baked into the code, so `.env.local` is optional for local dev.
`NEXT_PUBLIC_WHATSAPP_NUMBER` is only a fallback — the real number is a CMS
Site Settings field. `NEXT_PUBLIC_SITE_URL` is used for canonical URLs,
sitemap, and structured data.
