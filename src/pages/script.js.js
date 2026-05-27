import { readRootFile } from "../lib/html.js";

export function GET() {
  return new Response(readRootFile("script.js"), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
    },
  });
}
