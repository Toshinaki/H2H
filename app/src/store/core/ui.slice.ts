import _ from "@lodash";
import type { StateSlice } from "store/types";
import type { UISlice } from "./types";
import type { UIState } from "@ig/configs";

const DEFAULT_UI_STATE: UIState = {
  layout: {
    leftSidebar: {
      opened: true,
      hiddenOpened: false,
      folded: false,
    },
    rightSidebar: {
      opened: true,
      hiddenOpened: false,
      folded: false,
    },
  },
};

export const createUISlice: StateSlice<UISlice> = (set) => {
  return {
    ...DEFAULT_UI_STATE,

    setUIState: (uiState) =>
      set(
        (state) => {
          const newState: UISlice = _.merge(
            {},
            state.ui,
            _.pick(state.auth.user.preference, [
              "ui.layout.leftSidebar.opened",
              "ui.layout.leftSidebar.folded",
              "ui.layout.rightSidebar.opened",
              "ui.layout.rightSidebar.folded",
            ]).ui,
            uiState,
          );
          if (!_.isEqual(newState, state.ui)) {
            state.ui = newState;
          }
        },
        undefined,
        { type: "ui/set-ui-state", data: { uiState } },
      ),

    toggleSidebarOpen: (position = "left", open = undefined, shouldUpdateUser = false) =>
      set(
        (state) => {
          if (shouldUpdateUser) {
            state.auth.user.preference = _.merge({}, state.auth.user.preference, {
              ui: {
                layout: {
                  [`${position}Sidebar`]: {
                    opened:
                      open === undefined
                        ? !(
                            state.auth.user.preference.ui?.layout?.[`${position}Sidebar`]?.opened ??
                            state.ui.layout[`${position}Sidebar`].opened
                          )
                        : open,
                  },
                },
              },
            });
          }
          state.ui.layout[`${position}Sidebar`].opened =
            open === undefined ? !state.ui.layout[`${position}Sidebar`].opened : open;
        },
        undefined,
        { type: `ui/toggle-${position}-sidebar`, data: { open, shouldUpdateUser } },
      ),

    toggleSidebarHiddenOpen: (position = "left", open = undefined) =>
      set(
        (state) => {
          state.ui.layout[`${position}Sidebar`].hiddenOpened =
            open === undefined ? !state.ui.layout[`${position}Sidebar`].hiddenOpened : open;
        },
        undefined,
        { type: `ui/toggle-hidden-${position}-sidebar` },
      ),

    toggleSidebarFold: (position = "left", fold = undefined, shouldUpdateUser = false) =>
      set(
        (state) => {
          if (shouldUpdateUser) {
            state.auth.user.preference = _.merge({}, state.auth.user.preference, {
              ui: {
                layout: {
                  [`${position}Sidebar`]: {
                    folded:
                      fold === undefined
                        ? !state.auth.user.preference.ui?.layout?.[`${position}Sidebar`]?.folded
                        : fold,
                  },
                },
              },
            });
          }
          state.ui.layout[`${position}Sidebar`].folded =
            fold === undefined ? !state.ui.layout[`${position}Sidebar`].folded : fold;
        },
        undefined,
        { type: `ui/toggle-${position}-sidebar-folded`, data: { fold, shouldUpdateUser } },
      ),

    toggleSidebarFoldedOpen: (position = "left", open = undefined) =>
      set(
        (state) => {
          state.ui.layout[`${position}Sidebar`].foldedOpened =
            open === undefined ? !state.ui.layout[`${position}Sidebar`].foldedOpened : open;
        },
        undefined,
        { type: `ui/toggle-folded-${position}-sidebar` },
      ),

    reset: () =>
      set(
        (state) => {
          state.ui = { ...state.ui, ...DEFAULT_UI_STATE };
        },
        undefined,
        { type: "ui/reset" },
      ),
  };
};
