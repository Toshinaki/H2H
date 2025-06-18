import _ from "@lodash";
import type { StateSlice } from "store/types";
import type { InitAction, InitSlice } from "./types";

const defaultState = {
  actions: [],
  status: undefined,
  success: undefined,
};

export const createInitSlice: StateSlice<InitSlice> = (set) => ({
  ...defaultState,
  setActions: (actions) =>
    set(
      (state) => {
        state.init.actions = actions;
      },
      undefined,
      { type: "init/setActions", data: { actions } },
    ),
  setAction: (name, action) =>
    set(
      (state) => {
        state.init[name] = _.merge(
          {},
          { ...(state.init[name] as InitAction | undefined) },
          action,
          { name },
        );
      },
      undefined,
      { type: `init/setAction: ${name}`, data: { action } },
    ),
  setStatus: (status) =>
    set(
      (state) => {
        state.init.status = status;
      },
      undefined,
      { type: "init/set-status", data: { status } },
    ),
  setSuccess: (success) =>
    set(
      (state) => {
        state.init.success = success;
      },
      undefined,
      { type: "init/set-success", data: { success } },
    ),
  reInit: () =>
    set(
      (state) => {
        if (state.init.actions.length > 0) {
          for (const action of state.init.actions) {
            if (action in state.init) {
              delete state.init[action];
            }
          }
        }
        state.init = { ...state.init, ...defaultState };
      },
      undefined,
      { type: "re-init" },
    ),
});
