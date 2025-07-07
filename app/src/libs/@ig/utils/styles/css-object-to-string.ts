import _ from "@lodash";
import { keys } from "../keys";

export function cssObjectToString(css: React.CSSProperties) {
  return keys(css)
    .reduce(
      (acc, rule) =>
        css[rule] !== undefined
          ? `${acc}${rule.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${css[rule]};`
          : acc,
      "",
    )
    .trim();
}
