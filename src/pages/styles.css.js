import { readRootFile } from "../lib/html.js";

export function GET() {
  return new Response(readRootFile("styles.css"), {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
    },
  });
}
