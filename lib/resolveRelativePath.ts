export const resolveRelativePath = (
  importPath: string,
  currentFilePath: string
) => {
  const pwd = currentFilePath.split("/").slice(0, -1).join("/");

  if (importPath.startsWith("./")) {
    return pwd + importPath.replace("./", "/");
  }

  if (importPath.startsWith("../")) {
    const pwdSegments = pwd.split("/");
    const importSegments = importPath.split("/");
    const traversalSegments = importSegments.filter((s) => s === "..");
    const nonTraversalSegments = importSegments.filter((s) => s !== "..");

    return pwdSegments
      .slice(0, -traversalSegments.length)
      .concat(nonTraversalSegments)
      .join("/");
  }
  return importPath;
};
