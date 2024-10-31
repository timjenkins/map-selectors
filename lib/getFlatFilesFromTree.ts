import type { Tree, File } from "../types.ts";

export function getFlatFilesFromTree(fileTree: Tree): File[] {
  return Object.values(fileTree)
    .flatMap((entry) => {
      if (entry.type === "file") return entry;
      if (entry.type === "directory") {
        return getFlatFilesFromTree(entry.children);
      }
    })
    .filter((file) => !!file);
}
