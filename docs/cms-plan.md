# CMS plan

The site now has an Astro build step while preserving the existing static pages.

Sanity is the editorial CMS for content that changes often:

- occasional workshops
- experiences and seasonal events
- trusted brands
- venues
- available schedules
- values/prices
- gallery images

Sanity should become the source of truth for editable content, while Astro keeps
generating static HTML for SEO and performance on Vercel.

## Dynamic sections

The site keeps fixed pages and fixed visual structure. Sanity only feeds cards
and editable blocks inside those pages.

### `experiencias.html`

Rendered from `src/pages/experiencias.astro`.

- `occasionalWorkshop`: powers the "Talleres ocasionales" block.
- `experience`: replaces the static "Que hacemos" cards when published
  experiences exist.
- `brand`: powers the "Marcas que confian" block.

If Sanity returns no published `experience` documents, the original static
experience cards remain visible as fallback content.

### `contacto.html`

Rendered from `src/pages/contacto.astro`.

- `venue`: replaces the static "Sedes Robotiki" grid when published venues
  exist.
- `schedule`: replaces the static "Horarios orientativos" grid when published
  schedules exist.

If Sanity returns no published venues or schedules, the original static sections
remain visible as fallback content.

The navigation label is "Sedes y contacto" and points to `contacto.html`.
Internal CTAs can still point to `contacto.html#sedes`.

## Current editorial model

- `occasionalWorkshop`: title, summary, date, age range, venue, schedule, price,
  image, featured flag, publish flag.
- `experience`: title, category, summary, body, image, gallery, event date,
  featured flag, publish flag.
- `brand`: name, logo, website, order, publish flag.
- `venue`: name, zone, address, Google Maps URL, WhatsApp, publish flag.
- `schedule`: level, venue, day, time, notes, publish flag.

## Setup required

Create a Sanity project and add these variables in Vercel:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET` (usually `production`)
- `PUBLIC_SANITY_API_VERSION` (example: `2026-05-27`)
- `SANITY_AUTH_TOKEN` (deploy token used by Vercel to sync Studio schemas)

Then add the deployed Vercel domain to Sanity CORS settings so Astro can read
published content during builds.

Because the Studio is self-hosted under `/admin`, Vercel runs
`sanity deploy --external` and `sanity schema deploy` whenever
`SANITY_AUTH_TOKEN` is available, then runs the Astro build and extracts the
Studio manifest into `dist/static`. Generate the token in Sanity Manage with
deploy permissions, then store it only in Vercel environment variables.

## Local development

Use Docker instead of installing dependencies locally. The project includes
`Dockerfile` and `docker-compose.yml` for this.

```sh
docker compose up web
```

Then open:

- `http://localhost:4321/`
- `http://localhost:4321/experiencias`
- `http://localhost:4321/contacto`

In Astro dev mode, page routes are served without `.html`. The static build
still outputs `.html` files for Vercel, so production URLs like
`/experiencias.html` and `/contacto.html` remain valid.

Run a production build check inside Docker with:

```sh
docker compose run --rm web sh -lc "npm ci && npm run build"
```

Docker is only for local development and validation. Vercel continues to use
`vercel.json` and `npm run vercel-build`.
