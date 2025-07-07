import { isResponsiveSize } from "../is-responsive-size";
import { isPrimitiveSize } from "../is-primitive-size";
import { rem } from "../units-converters";
import { getBaseSize } from "../get-base-size";
import type { LayoutConfig } from "@ig/configs";
import type { CSSVariables, MediaQueryVariables } from "./get-variables";

interface AssignHeaderVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  header: LayoutConfig["header"];
}

export function assignHeaderVariables({
  baseStyles,
  minMediaStyles,
  header,
}: AssignHeaderVariablesInput) {
  const headerHeight = header.size;
  const headerHeightFixed = header.autohide.size || headerHeight;

  for (const [size, varName] of [
    [headerHeight, "--header-size"],
    [headerHeightFixed, "--header-size-fixed"],
  ] as const) {
    if (isPrimitiveSize(size)) {
      const baseSize = rem(getBaseSize(size));
      baseStyles[varName] = baseSize;
    }

    if (isResponsiveSize(size)) {
      if (typeof size.base !== "undefined") {
        baseStyles[varName] = rem(size.base);
      }

      Object.keys(size).forEach((key) => {
        if (key !== "base") {
          minMediaStyles[key] = minMediaStyles[key] || {};
          minMediaStyles[key][varName] = rem(size[key as keyof typeof size]);
        }
      });
    }
  }
}
