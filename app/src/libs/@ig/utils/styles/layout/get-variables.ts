import { getSortedBreakpoints } from "../get-sorted-breakpoints";
import { em } from "../units-converters";
import { assignHeaderVariables } from "./assign-header-variables";
import { assignSidebarVariables } from "./assign-sidebar-variables";
import type { LayoutConfig } from "@ig/configs";

export type CSSVariables = Record<`--${string}`, string | undefined>;
export type MediaQueryVariables = Record<string, Record<`--${string}`, string | undefined>>;

interface GetVariablesInput {
  leftSidebar?: LayoutConfig["leftSidebar"];
  rightSidebar?: LayoutConfig["leftSidebar"];
  header?: LayoutConfig["header"];
  footer?: LayoutConfig["footer"];
}

export function getVariables({ leftSidebar, rightSidebar, header, footer }: GetVariablesInput) {
  const minMediaStyles: MediaQueryVariables = {};
  const baseStyles: CSSVariables = {};

  if (header) {
    assignHeaderVariables({
      baseStyles,
      minMediaStyles,
      header,
    });
  }

  if (leftSidebar) {
    assignSidebarVariables({
      baseStyles,
      minMediaStyles,
      sidebar: leftSidebar,
      position: "left",
    });
  }
  if (rightSidebar) {
    assignSidebarVariables({
      baseStyles,
      minMediaStyles,
      sidebar: rightSidebar,
      position: "right",
    });
  }

  //   assignHeaderVariables({ baseStyles, minMediaStyles, header });
  //   assignFooterVariables({ baseStyles, minMediaStyles, footer });

  console.log({ baseStyles });
  const minMedia = getSortedBreakpoints(Object.keys(minMediaStyles)).map((breakpoint) => ({
    query: `(min-width: ${em(breakpoint.px)})`,
    styles: minMediaStyles[breakpoint.value],
  }));

  const media = [...minMedia];

  return { baseStyles, media };
}
