# Soccer Cubs Website

The Soccer Cubs marketing site and parent sign-up/subscription flow —
Next.js + Tailwind + Supabase + Stripe + Resend.

**First time setting this up? Start with [SETUP.md](./SETUP.md)** —
it walks through creating the Supabase/Stripe/Resend accounts, filling
in environment variables, adding daycare locations, and deploying, all
in plain language.

## Everyday commands

```bash
npm run dev          # run the site locally at http://localhost:3000
npm run build         # production build (also catches errors)
npm run lint           # check code style
npm run stripe:sync   # sync daycare prices to Stripe after adding/editing a location
```

## Project layout

- `src/app/` — pages and API routes (App Router)
- `src/components/` — shared UI pieces
- `src/lib/` — Supabase, Stripe, Resend, and validation helpers
- `supabase/schema.sql` — database schema, run once in Supabase's SQL Editor
- `scripts/sync-stripe-prices.mjs` — keeps Stripe prices in sync with the `locations` table
- `public/images/brand/` — logo assets (originals kept in `original/`)
