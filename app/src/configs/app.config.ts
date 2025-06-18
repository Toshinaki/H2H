import _ from "@lodash";
import { DEFAULT_APP_CONFIG, DEFAULT_UI_CONFIG, type Config } from "@ig/configs";
import type { Breakpoint } from "@mui/material/styles";
import type { Me } from "common/types";

export const APP_CONFIG: Config = {
  app: _.merge({}, DEFAULT_APP_CONFIG, {}),
  ui: _.merge({}, DEFAULT_UI_CONFIG, {}),
};

export const SMALL_SCREEN_BREAKPOINT: Breakpoint | number = "xs";

export const ANONYMOUS_USER: Me = {
  preference: {},
};
