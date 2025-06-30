import _ from "@lodash";
import { ANONYMOUS_USER } from "configs/app.config";
import type { StateSlice } from "store/types";
import type { AuthSlice, AuthState } from "./types";

const initState: AuthState = {
  user: ANONYMOUS_USER,
};

export const createAuthSlice: StateSlice<AuthSlice> = (set, get) => ({
  ...initState,

  setUser: (user) =>
    set(
      (state) => {
        const newUser = _.merge({}, state.auth.user, user);
        const {
          config: { setConfig },
        } = state;
        if (newUser.preference.app) {
          setConfig({ app: newUser.preference.app });
        }
        if (newUser.preference.ui) {
          setConfig({
            ui: _.omit(newUser.preference.ui, [
              "layout.leftSidebar.opened",
              "layout.leftSidebar.folded",
              "layout.rightSidebar.opened",
              "layout.rightSidebar.folded",
            ]),
          });
          state.ui.layout = _.merge(
            {},
            state.ui.layout,
            _.pick(newUser.preference.ui.layout, [
              "leftSidebar.opened",
              "leftSidebar.folded",
              "rightSidebar.opened",
              "rightSidebar.folded",
            ]),
          );
        }

        state.auth.user = newUser;
      },
      undefined,
      { type: "auth/set-user", data: { user } },
    ),

  updateUser: (user) => {
    if (user) {
      const {
        config: { setConfig },
        // ui: { setUIState },
      } = get();
      if (user?.preference?.app) {
        setConfig({ app: user.preference.app });
      }
      if (user?.preference?.ui) {
        setConfig({
          ui: _.omit(user.preference.ui, [
            "layout.leftSidebar.opened",
            "layout.leftSidebar.folded",
            "layout.rightSidebar.opened",
            "layout.rightSidebar.folded",
          ]),
        });
        // setUIState(
        //   _.pick(user.preference.ui, [
        //     "layout.leftSidebar.opened",
        //     "layout.leftSidebar.folded",
        //     "layout.rightSidebar.opened",
        //     "layout.rightSidebar.folded",
        //   ]),
        // );
      }

      return set(
        (state) => {
          state.auth.user = _.merge({}, state.auth.user, user);
        },
        undefined,
        { type: "auth/update-user", data: { user } },
      );
    }
  },

  reset: () =>
    set(
      (state) => {
        state.auth = { ...state.auth, ...initState };
      },
      undefined,
      { type: "auth/reset" },
    ),
});
