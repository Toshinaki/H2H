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
      set((state) => {
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
      }),

    toggleSidebarOpen: (position = "left", open = undefined) =>
      set(
        (state) => {
          if (position === "right") {
            state.ui.layout.rightSidebar.opened =
              open === undefined ? !state.ui.layout.rightSidebar.opened : open;
          } else {
            state.ui.layout.leftSidebar.opened =
              open === undefined ? !state.ui.layout.leftSidebar.opened : open;
          }
        },
        undefined,
        { type: `ui/toggle-${position}-sidebar` },
      ),

    toggleSidebarHiddenOpen: (position = "left", open = undefined) =>
      set(
        (state) => {
          if (position === "right") {
            state.ui.layout.rightSidebar.hiddenOpened =
              open === undefined ? !state.ui.layout.rightSidebar.hiddenOpened : open;
          } else {
            state.ui.layout.leftSidebar.hiddenOpened =
              open === undefined ? !state.ui.layout.leftSidebar.hiddenOpened : open;
          }
        },
        undefined,
        { type: `ui/toggle-hidden-${position}-sidebar` },
      ),

    toggleSidebarFold: (position = "left", fold = undefined) =>
      set(
        (state) => {
          if (position === "right") {
            state.ui.layout.rightSidebar.folded =
              fold === undefined ? !state.ui.layout.rightSidebar.folded : fold;
          } else {
            state.ui.layout.leftSidebar.folded =
              fold === undefined ? !state.ui.layout.leftSidebar.folded : fold;
          }
        },
        undefined,
        { type: `ui/toggle-${position}-sidebar-folded` },
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
