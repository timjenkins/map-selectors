export function findFunctionContainingVariable(
  text: string,
  searchVar: string
): string | null {
  // check for default export
  const defaultExportName = text.match(/export default (\w+)/)?.[1];
  if (defaultExportName) return defaultExportName;

  const normal = new RegExp(`useSelector\\(${searchVar}`);
  const useSelectorSplit = new RegExp(`useSelector\\(\\s+${searchVar}`);
  const useSelectorWith = new RegExp(`useSelectorWith\\(${searchVar}`);
  const useSelectorWithSplit = new RegExp(`useSelectorWith\\(\\s+${searchVar}`);

  const match =
    text.match(normal) ||
    text.match(useSelectorSplit) ||
    text.match(useSelectorWith) ||
    text.match(useSelectorWithSplit);

  if (!match) return null;

  const textBeforeMatch = text.substring(0, match.index);
  const functionMatch = textBeforeMatch.matchAll(/export const (\w+)/g);
  const ary = [...functionMatch];
  const functionName = ary[ary.length - 1]?.[1];
  return functionName || null;
}
