import { px } from "./units-converters";
import { BREAKPOINTS, type Breakpoint } from "@ig/configs";

export function getBreakpointValue(breakpoint: number | string) {
  if (breakpoint in BREAKPOINTS) {
    return px(BREAKPOINTS[breakpoint as Breakpoint]) as number;
  }

  return px(breakpoint) as number;
}
