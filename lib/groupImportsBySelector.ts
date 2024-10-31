import type { FlatSelector } from "../types.ts";

interface Selector {
  selector: string;
  path: string;
  consumers: Record<
    string,
    {
      componentName: string;
      path: string;
    }
  >;
}

type GroupedSelectors = Record<string, Selector>;
export function groupImportsBySelector(selectors: FlatSelector[]) {
  // const selectors: Record<string, string[]> = {};
  return selectors.reduce<GroupedSelectors>((acc, selectorInfo) => {
    const name = `${selectorInfo.importPath}/${selectorInfo.selector}`;
    const consumerName = `${selectorInfo.path}/${selectorInfo.calledWithin}`;
    const consumer = {
      componentName: selectorInfo.calledWithin,
      path: selectorInfo.path,
    };

    if (acc[name]) {
      acc[name].consumers[consumerName] = consumer;
    } else {
      acc[name] = {
        selector: selectorInfo.selector,
        path: selectorInfo.path,
        consumers: {
          [consumerName]: consumer,
        },
      };
    }
    return acc;
  }, {});
}
