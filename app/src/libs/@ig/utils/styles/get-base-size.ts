import type { Size } from "@ig/configs";

export function getBaseSize(size: Size) {
  if (typeof size === "object") {
    return size.base;
  }

  return size;
}
