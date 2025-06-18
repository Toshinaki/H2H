import { createTheme } from "@mui/material/styles";
import _ from "@lodash";
import { defaultThemeOptions, mustHaveThemeOptions, THEMES, type ThemeID } from "@ig/configs";

export default ({
  id,
  scale = 1,
  radius = 4,
  cssVarPrefix,
  rootSelector,
}: {
  id: ThemeID;
  scale?: number;
  radius?: number;
  cssVarPrefix?: string;
  rootSelector?: string;
}) =>
  createTheme(
    _.merge(
      {},
      defaultThemeOptions,
      THEMES[id],
      mustHaveThemeOptions,
      { typography: { htmlFontSize: 16 * scale } },
      cssVarPrefix ? { cssVariables: { cssVarPrefix, rootSelector } } : {},
    ) as Parameters<typeof createTheme>[0],
  );
