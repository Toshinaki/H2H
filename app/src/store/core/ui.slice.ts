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

    toggleSidebarOpen: (position = "left") =>
      set(
        (state) => {
          if (position === "right") {
            state.ui.layout.rightSidebar.opened = !state.ui.layout.rightSidebar.opened;
          } else {
            state.ui.layout.leftSidebar.opened = !state.ui.layout.leftSidebar.opened;
          }
        },
        undefined,
        { type: `ui/toggle-${position}-sidebar` },
      ),

    toggleSidebarHiddenOpen: (position = "left") =>
      set(
        (state) => {
          if (position === "right") {
            state.ui.layout.rightSidebar.hiddenOpened = !state.ui.layout.rightSidebar.hiddenOpened;
          } else {
            state.ui.layout.leftSidebar.hiddenOpened = !state.ui.layout.leftSidebar.hiddenOpened;
          }
        },
        undefined,
        { type: `ui/toggle-hidden-${position}-sidebar` },
      ),

    toggleSidebarFold: (position = "left") =>
      set(
        (state) => {
          if (position === "right") {
            state.ui.layout.rightSidebar.folded = !state.ui.layout.rightSidebar.folded;
          } else {
            state.ui.layout.leftSidebar.folded = !state.ui.layout.leftSidebar.folded;
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
