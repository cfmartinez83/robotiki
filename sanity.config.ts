import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";

const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "f95ac08s";
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "robotiki",
  title: "Robotiki",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
