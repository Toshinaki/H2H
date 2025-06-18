import type { StateCreator } from "zustand";
import type { AuthSlice, ConfigSlice, ConfigState, InitSlice, UISlice } from "store/core/types";

export interface AppState {
  init: InitSlice;
  config: ConfigSlice;
  ui: UISlice;
  auth: AuthSlice;
  //   navigation: NavigationSlice;
  //   navbar: NavbarSlice;
}

export type StateSlice<T> = StateCreator<
  AppState,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [["zustand/persist", Partial<T>]],
  T
>;

export interface PersistedState {
  config: ConfigState;
  //   auth: AuthState;
  //   navigation: NavigationState;
}
