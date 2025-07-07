import type { Size } from "@ig/configs";

export function isPrimitiveSize(size: Size | undefined): size is Size {
  const isBaseSize =
    typeof size === "object" &&
    size !== null &&
    typeof size.base !== "undefined" &&
    Object.keys(size).length === 1;
  return typeof size === "number" || typeof size === "string" || isBaseSize;
}
