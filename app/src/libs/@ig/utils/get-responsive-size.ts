import type { Size } from "@ig/configs";

export const getReponsiveSize = (size: Size, variableName: string) => {
  if (typeof size !== "object" || size === null) {
    return { [variableName]: size };
  }
};
