import { createTheme } from "@mui/material/styles";
import _ from "@lodash";
import { defaultThemeOptions, mustHaveThemeOptions, THEMES, type ThemeID } from "@ig/configs";

export type GetThemeParams = Parameters<typeof createTheme>[0] & {
  id: ThemeID;
  scale?: number;
  radius?: number;
};

export default ({ id, scale = 1, radius = 4, ...options }: GetThemeParams) =>
  createTheme(
    _.merge({}, defaultThemeOptions, THEMES[id], options, mustHaveThemeOptions, {
      typography: { htmlFontSize: 16 * scale },
      shape: { borderRadius: radius },
    }) as Parameters<typeof createTheme>[0],
  );
