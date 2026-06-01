import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";

const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "f95ac08s";
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const siteSettingsDocumentId = "8d0d7882-84ff-4b1a-afe5-9a69c9e16858";
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
  document: {
    actions: (previousActions, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return previousActions.filter(({action}) => !["delete", "duplicate"].includes(action || ""));
      }

      return previousActions;
    },
  },
});
