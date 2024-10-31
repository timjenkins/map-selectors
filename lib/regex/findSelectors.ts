export function findSelectors(text: string): string[] {
  const selectorWithRegex = /(?<=useSelectorWith\(\s*)(select[^\s,]+)/g;
  const selectorRegex = /(?<=useSelector\(\s*)(select[^\s()]+)/g;

  const useSelectorWith = text.match(selectorWithRegex) || [];
  const useSelector = text.match(selectorRegex) || [];

  return [...useSelectorWith, ...useSelector];
}
