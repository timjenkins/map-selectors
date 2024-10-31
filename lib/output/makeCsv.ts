import { stringify } from "jsr:@std/csv";
import { File, FlatSelector } from "../../types.ts";
export function makeCsv(allSelectors: FlatSelector[]) {
  return stringify(
    allSelectors as readonly Record<keyof FlatSelector, string>[],
    {
      columns: ["name", "calledWithin", "path", "selector", "importPath"],
    }
  );
}

export function getAllSelectors(files: File[]): FlatSelector[] {
  return files.flatMap((file) => {
    return file.selectors.map((selector) => {
      return {
        name: file.name,
        calledWithin: selector.calledWithin,
        path: file.path,
        selector: selector.selector,
        importPath: selector.importPath,
      };
    });
  });
}
