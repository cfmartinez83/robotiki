# CMS plan

The site now has an Astro build step while preserving the existing static pages.

Sanity is the editorial CMS for content that changes often:

- occasional workshops
- experiences and seasonal events
- trusted brands
- values/prices
- available schedules
- gallery images

Sanity should become the source of truth for editable content, while Astro keeps
generating static HTML for SEO and performance on Vercel.

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

Use Docker instead of installing dependencies locally:

```sh
docker run --rm -it -v "$PWD":/app -v /app/node_modules -w /app -p 4321:4321 node:22-alpine sh
npm ci
npm run dev -- --host 0.0.0.0
```

For the Sanity Studio:

```sh
npm run sanity:dev
```
