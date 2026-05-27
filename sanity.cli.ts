import {defineCliConfig} from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "f95ac08s",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  },
  project: {
    basePath: "/admin",
  },
  deployment: {
    appId: "d27fwkdipdg6xjikbcy37wv6",
  },
});
