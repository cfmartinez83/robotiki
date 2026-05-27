import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "f95ac08s",
      dataset: process.env.PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      studioBasePath: "/admin",
    }),
  ],
  build: {
    format: "file",
  },
});
