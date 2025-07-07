import { isResponsiveSize } from "../is-responsive-size";
import { isPrimitiveSize } from "../is-primitive-size";
import { rem } from "../units-converters";
import { getBaseSize } from "../get-base-size";
import type { LayoutConfig } from "@ig/configs";
import type { CSSVariables, MediaQueryVariables } from "./get-variables";

interface AssignSidebarVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  sidebar: LayoutConfig["leftSidebar"] | LayoutConfig["rightSidebar"];
  position: "left" | "right";
}

export function assignSidebarVariables({
  baseStyles,
  minMediaStyles,
  sidebar,
  position,
}: AssignSidebarVariablesInput) {
  const sidebarWidth = sidebar.size;
  const sidebarWidthFolded = sidebar.autofold.size || sidebarWidth;
  const sidebarWidthOffset = sidebar.offset;

  for (const [size, varName] of [
    [sidebarWidth, `--${position}-sidebar-width`],
    [sidebarWidthFolded, `--${position}-sidebar-width-folded`],
    [sidebarWidthOffset, `--${position}-sidebar-offset`],
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
