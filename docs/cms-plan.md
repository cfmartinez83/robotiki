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
- workshop cards for `talleres.html`

Sanity should become the source of truth for editable content, while Astro keeps
generating static HTML for SEO and performance on Vercel.

## Dynamic sections

The site keeps fixed pages and fixed visual structure. Sanity only feeds cards
and editable blocks inside those pages.

`siteSettings` is treated as a singleton in the Studio. Editors should see
`Configuración del sitio` as one form, not as a list where multiple settings
documents can be created. The Studio structure points to the existing settings
document and removes `siteSettings` from the "new document" templates.

Existing duplicate settings documents should not be used for new content. Once
the singleton has been verified in production, old duplicate settings documents
can be unpublished or deleted from Sanity Manage/Studio.

The Studio hides delete and duplicate actions for this singleton to reduce the
chance of leaving the settings screen pointing at a removed document.

The shared Astro layout reads global site fields from this singleton and applies
them across the static pages with hardcoded fallbacks. This currently covers the
footer tagline, public emails, WhatsApp label/link, primary address, business
hours, main CTA label, and copyright text.

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

The venues section also renders an inline SVG map. This is intentionally a
static illustration with approximate neighborhood pins, not a Google Maps embed,
so it stays fast and does not require third-party map scripts. Each pin links to
the matching venue `mapUrl`.

Schedule cards include the referenced venue address when available, and the
venue/address text links to Google Maps through the same `mapUrl`.

The navigation label is "Sedes y contacto" and points to `contacto.html`.
Internal CTAs can still point to `contacto.html#sedes`.

### `talleres.html`

Rendered from `src/pages/talleres.astro`.

- `siteSettings.workshopsSection`: controls the editable eyebrow, title, intro
  text, and visibility flag.
- `workshop`: powers the dynamic "Talleres ocasionales" gallery below the
  "Querés saber qué taller corresponde?" CTA.

If the settings section is disabled or there are no published `workshop`
documents, the dynamic section is hidden.

## Current editorial model

- `siteSettings`: site name, tagline, copyright, contact information, social
  links, primary CTA label, default SEO fields, and editable section settings.
- `occasionalWorkshop`: title, summary, date, age range, venue, schedule, price,
  image, featured flag, publish flag.
- `experience`: title, category, summary, body, image, gallery, event date,
  featured flag, publish flag.
- `brand`: name, logo, website, order, publish flag.
- `venue`: name, zone, address, Google Maps URL, WhatsApp, publish flag.
- `schedule`: level, venue, day, time, notes, publish flag.
- `workshop`: title, text, image, image alt text, order, publish flag.

## Legal pages

`privacidad.html` and `terminos.html` are fixed Astro-rendered pages generated
from static HTML files. Footer links are injected by `StaticPage.astro`, so the
legal links appear consistently across the site without duplicating footer
markup in every page.

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
