import type { ResponsiveSize, Size } from "@ig/configs";

export function isResponsiveSize(size: Size | undefined): size is ResponsiveSize {
  if (typeof size !== "object" || size === null) {
    return false;
  }

  if (Object.keys(size as object).length === 1 && "base" in (size as object)) {
    return false;
  }

  return true;
}
