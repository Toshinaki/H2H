import type { PartialDeep } from "type-fest";
import type { Config, UIState } from "@ig/configs";
import type { Me } from "common/types";
// import type { NavigationType } from "@ig/types/navigation";

// init

type InitActionType = "loader" | "checker";
type InitActionState = "inProgress" | "done";

export type InitAction = {
  name: string;
  type: InitActionType;
  state?: InitActionState;
  success?: boolean;
  ignored?: boolean;
};

interface InitState {
  actions: Array<string>;
  status?: "initializing" | "initialized";
  success?: boolean;
  [key: string]: unknown;
}
interface InitActions {
  setAction: (name: string, action: Partial<InitAction>) => void;
  setActions: (actions: Array<string>) => void;
  setStatus: (state: InitState["status"]) => void;
  setSuccess: (success: InitState["success"]) => void;
  reInit: () => void;
}
export type InitSlice = InitState & InitActions;

// config

export interface ConfigState {
  // app default
  default: Config;
  // app default + user preference + current page config
  current: Config;
}
export interface ConfigActions {
  setConfig: (config: PartialDeep<Config>) => void;
  reset: () => void;
}
export type ConfigSlice = ConfigState & ConfigActions;

// ui

export interface UIActions {
  setUIState: (uiState: PartialDeep<UIState>) => void;
  toggleSidebarOpen: (position: "left" | "right", open?: boolean) => void;
  toggleSidebarHiddenOpen: (position: "left" | "right", open?: boolean) => void;
  toggleSidebarFold: (position: "left" | "right", fold?: boolean) => void;
  reset: () => void;
}
export type UISlice = UIState & UIActions;

// auth

export interface AuthState {
  user: Me;
}
interface AuthActions {
  setUser: (user: Me, isInit?: boolean) => void;
  updateUser: (user: PartialDeep<Me>) => void;
  reset: () => void;
}
export type AuthSlice = AuthState & AuthActions;

// // navigation

// export interface NavigationState {
//   navigations: Array<NavigationType>;
// }
// interface NavigationActions {
//   setNavigations: (
//     navigations:
//       | Array<NavigationType>
//       | ((curr: Array<NavigationType>) => Array<NavigationType>),
//   ) => void;
//   updateNavigation: (navigation: NavigationType) => void;
//   reset: () => void;
// }
// export type NavigationSlice = NavigationState & NavigationActions;

// // navbar

// export interface NavbarState {
//   collapsed?: boolean;
//   mobileCollapsed?: boolean;
//   folded?: boolean;
// }
// interface NavbarActions {
//   toggleNavbar: (show?: boolean) => void;
//   toggleNavbarMobile: (show?: boolean) => void;
//   toggleFolded: (folded?: boolean) => void;
//   reset: () => void;
// }
// export type NavbarSlice = NavbarState & NavbarActions;
