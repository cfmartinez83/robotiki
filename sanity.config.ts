import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";

const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "f95ac08s";
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const siteSettingsDocumentId = "7599209b-3e9c-4dd3-a4ca-6174ed11ce50";
const singletonTypes = new Set(["siteSettings"]);

export default defineConfig({
  name: "robotiki",
  title: "Robotiki",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Configuración del sitio")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId(siteSettingsDocumentId)),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() || "")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },
});
