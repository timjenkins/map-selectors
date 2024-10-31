import { buildDirectoryTree } from "./lib/buildDirectoryTree.ts";
import { getFlatFilesFromTree } from "./lib/getFlatFilesFromTree.ts";
import { getAllSelectors, makeCsv } from "./lib/output/makeCsv.ts";
import { makeHtml } from "./lib/output/makeHtml.ts";

main("../mono/libs/le-shared");
async function main(path: string) {
  const fileTree = buildDirectoryTree(path);
  const files = getFlatFilesFromTree(fileTree);
  const allSelectors = getAllSelectors(files);

  const csv = makeCsv(allSelectors);
  await Deno.writeTextFile("output/selectors.csv", csv);

  const html = makeHtml(allSelectors);
  await Deno.writeTextFile("output/filesBySelector.html", html);
}
