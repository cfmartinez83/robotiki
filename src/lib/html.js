import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

export function readRootFile(path) {
  return readFileSync(resolve(root, path), "utf8");
}

export function readStaticPage(path) {
  const html = readRootFile(path);
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const bodyAttrs = bodyMatch?.[1]?.trim() ?? "";
  const bodyClass = bodyAttrs.match(/class="([^"]*)"/i)?.[1] ?? "";

  return {
    title: titleMatch?.[1]?.trim() ?? "Robotiki",
    description: descriptionMatch?.[1]?.trim() ?? "",
    bodyClass,
    body: bodyMatch?.[2]?.trim() ?? "",
  };
}
