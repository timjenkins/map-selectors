import { findSelectors } from "./regex/findSelectors.ts";
import { findImportPath } from "./regex/findImportPath.ts";
import { resolveRelativePath } from "./resolveRelativePath.ts";
import type { Directory } from "../types.ts";
import type { Tree, File } from "../types.ts";
import { findFunctionContainingVariable } from "./regex/findEnclosingFunction.ts";

function makeFileEntry(path: string): File | null {
  const file: File = {
    type: "file",
    path,
    name: path.split("/").pop()!,
    selectors: getSelectorsFromFile(path),
  };

  return file.selectors.length > 0 ? file : null;
}

function getAbsoluteImportPath(
  file: string,
  selector: string,
  filePath: string
) {
  const rawImportPath = findImportPath(file, selector);
  if (!rawImportPath) return null;
  return resolveRelativePath(rawImportPath, filePath);
}

function getSelectorsFromFile(path: string) {
  const file = Deno.readTextFileSync(path);
  const selectors = findSelectors(file) || [];

  return [...selectors]
    .map((selector) => {
      const importPath = getAbsoluteImportPath(file, selector, path);
      const calledWithin = findFunctionContainingVariable(file, selector) || "";
      return importPath ? { selector, importPath, calledWithin } : null;
    })
    .filter((value) => !!value);
}

export function buildDirectoryTree(path: string) {
  const tree: Tree = {};
  const directory = Deno.readDirSync(path);

  for (const entry of directory) {
    const { isFile, isDirectory, name } = entry;
    const fullPath = `${path}/${name}`;

    if (isFile) {
      const fileEntry = makeFileEntry(fullPath);
      if (fileEntry) tree[name] = fileEntry;
    }

    if (isDirectory) {
      const directory: Directory = {
        type: "directory",
        path: fullPath,
        children: buildDirectoryTree(fullPath),
      };

      if (Object.keys(directory.children).length > 0) {
        tree[name] = directory;
      }
    }
  }
  return tree;
}
