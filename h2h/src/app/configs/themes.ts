import { MantineThemeOverride } from "@mantine/core";

import { COLOR_SHADES } from "./colors";

export type ThemeType = keyof typeof COLOR_SHADES | "default";

export const THEMES: Record<ThemeType, MantineThemeOverride> = {
  default: {},
  // veryPeri: {
  //   primaryColor: "primary",
  //   primaryShade: { light: 4, dark: 4 },
  //   colors: {
  //     primary: COLOR_SHADES.veryPeri,
  //   },
  // },
  illuminating: {
    primaryColor: "primary",
    primaryShade: { light: 3, dark: 3 },
    colors: {
      primary: COLOR_SHADES.illuminating,
    },
  },
  // classicBlue: {
  //   primaryColor: "primary",
  //   primaryShade: { light: 6, dark: 6 },
  //   colors: {
  //     primary: COLOR_SHADES.classicBlue,
  //   },
  // },
  livingCoral: {
    primaryColor: "primary",
    primaryShade: { light: 3, dark: 3 },
    colors: {
      primary: COLOR_SHADES.livingCoral,
    },
  },
  ultraViolet: {
    primaryColor: "primary",
    primaryShade: { light: 5, dark: 5 },
    colors: {
      primary: COLOR_SHADES.ultraViolet,
    },
  },
  greenery: {
    primaryColor: "primary",
    primaryShade: { light: 5, dark: 5 },
    colors: {
      primary: COLOR_SHADES.greenery,
    },
  },
  serenity: {
    primaryColor: "primary",
    primaryShade: { light: 3, dark: 3 },
    colors: {
      primary: COLOR_SHADES.serenity,
    },
  },
  marsala: {
    primaryColor: "primary",
    primaryShade: { light: 5, dark: 5 },
    colors: {
      primary: COLOR_SHADES.marsala,
    },
  },
  radiandOrchid: {
    primaryColor: "primary",
    primaryShade: { light: 4, dark: 4 },
    colors: {
      primary: COLOR_SHADES.radiandOrchid,
    },
  },
  emerald: {
    primaryColor: "primary",
    primaryShade: { light: 6, dark: 6 },
    colors: {
      primary: COLOR_SHADES.emerald,
    },
  },
  tangerineTango: {
    primaryColor: "primary",
    primaryShade: { light: 4, dark: 4 },
    colors: {
      primary: COLOR_SHADES.tangerineTango,
    },
  },
  honeysucle: {
    primaryColor: "primary",
    primaryShade: { light: 4, dark: 4 },
    colors: {
      primary: COLOR_SHADES.honeysucle,
    },
  },
  turquoise: {
    primaryColor: "primary",
    primaryShade: { light: 5, dark: 5 },
    colors: {
      primary: COLOR_SHADES.turquoise,
    },
  },
  mimosa: {
    primaryColor: "primary",
    primaryShade: { light: 3, dark: 3 },
    colors: {
      primary: COLOR_SHADES.mimosa,
    },
  },
  blueIris: {
    primaryColor: "primary",
    primaryShade: { light: 4, dark: 4 },
    colors: {
      primary: COLOR_SHADES.blueIris,
    },
  },
  chiliPepper: {
    primaryColor: "primary",
    primaryShade: { light: 6, dark: 6 },
    colors: {
      primary: COLOR_SHADES.chiliPepper,
    },
  },
  // blueTurquoise: {
  //   primaryColor: "primary",
  //   primaryShade: { light: 4, dark: 4 },
  //   colors: {
  //     primary: COLOR_SHADES.blueTurquoise,
  //   },
  // },
  tigerlily: {
    primaryColor: "primary",
    primaryShade: { light: 4, dark: 4 },
    colors: {
      primary: COLOR_SHADES.tigerlily,
    },
  },
  aquaSky: {
    primaryColor: "primary",
    primaryShade: { light: 3, dark: 3 },
    colors: {
      primary: COLOR_SHADES.aquaSky,
    },
  },
  // trueRed: {
  //   primaryColor: "primary",
  //   primaryShade: { light: 5, dark: 5 },
  //   colors: {
  //     primary: COLOR_SHADES.trueRed,
  //   },
  // },
  fuchsiaRose: {
    primaryColor: "primary",
    primaryShade: { light: 4, dark: 4 },
    colors: {
      primary: COLOR_SHADES.fuchsiaRose,
    },
  },
};
