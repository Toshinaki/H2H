import _ from "@lodash";
import { APP_CONFIG } from "configs/app.config";
import type { StateSlice } from "store/types";
import type { ConfigSlice } from "./types";

export const createConfigSlice: StateSlice<ConfigSlice> = (set) => {
  return {
    default: _.cloneDeep(APP_CONFIG),
    current: _.cloneDeep(APP_CONFIG),

    setConfig: (config) =>
      set(
        (state) => {
          const newConfig = _.merge(
            {},
            state.config.default,
            _.omit(state.auth.user.preference, [
              "ui.layout.leftSidebar.opened",
              "ui.layout.leftSidebar.folded",
              "ui.layout.rightSidebar.opened",
              "ui.layout.rightSidebar.folded",
            ]),
            config,
          );
          if (!_.isEqual(newConfig, state.config.current)) {
            state.config.current = newConfig;
          }
        },
        undefined,
        { type: "config/setConfig", data: config },
      ),

    reset: () =>
      set(
        (state) => {
          state.config.default = _.cloneDeep(APP_CONFIG);
          state.config.current = _.cloneDeep(APP_CONFIG);
        },
        undefined,
        { type: "config/reset" },
      ),
  };
};
