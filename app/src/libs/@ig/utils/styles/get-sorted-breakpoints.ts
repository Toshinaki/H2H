import { getBreakpointValue } from "./get-breakpoint-value";

export function getSortedBreakpoints(values: string[]) {
  const convertedBreakpoints = values.map((breakpoint) => ({
    value: breakpoint,
    px: getBreakpointValue(breakpoint),
  }));

  convertedBreakpoints.sort((a, b) => a.px - b.px);
  return convertedBreakpoints;
}
