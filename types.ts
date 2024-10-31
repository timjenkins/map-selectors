export interface File {
  type: "file";
  path: string;
  name: string;
  selectors: { selector: string; importPath: string; calledWithin: string }[];
}

export interface Directory {
  type: "directory";
  path: string;
  children: Tree;
}

export type Tree = Record<string, Directory | File>;

export interface FlatSelector {
  name: string;
  calledWithin: string;
  path: string;
  selector: string;
  importPath: string;
}
