# Local development

This project should be run locally with Docker so contributors do not need to
install Node, Astro, or Sanity dependencies on the host machine.

## Start the site

```sh
docker compose up web
```

Open:

- `http://localhost:4321/`
- `http://localhost:4321/experiencias`
- `http://localhost:4321/contacto`
- `http://localhost:4321/jugar`

Astro dev routes do not require `.html`. The production static build still
generates `.html` files, so deployed URLs such as `/experiencias.html` and
`/contacto.html` remain valid.

## Build check

```sh
docker compose run --rm web sh -lc "npm ci && npm run build"
```

## Environment variables

`docker-compose.yml` provides safe defaults for local development:

- `PUBLIC_SANITY_PROJECT_ID=f95ac08s`
- `PUBLIC_SANITY_DATASET=production`
- `PUBLIC_SANITY_API_VERSION=2026-05-27`

If a local `.env` file defines these variables, Docker Compose will use those
values instead.

Do not store `SANITY_AUTH_TOKEN` locally unless it is explicitly needed. Vercel
uses that token during deploy to register the self-hosted Studio, deploy schemas,
and extract the Studio manifest.

## Deployment

Docker is not part of production deployment. Vercel still deploys from the repo
using `vercel.json` and `npm run vercel-build`.
