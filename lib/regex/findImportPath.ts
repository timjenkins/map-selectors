export function findImportPath(file: string, selector: string): string | null {
  const regex = new RegExp(
    `import[^{]*{[^}]*${selector}[^}]*}\\s*from\\s*['"]([^'"]*)`
  );
  const match = file.match(regex);
  return match ? match[1] : null;
}
