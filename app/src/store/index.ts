import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import _ from "@lodash";
import { logger } from "@ig/utils/store-logger";

import { createConfigSlice } from "./core/config.slice";
import { createInitSlice } from "./core/init.slice";
// import { createNavigationSlice } from "./core/navigation.slice";
// import { createNavbarSlice } from "./core/navbar.slice";
import { createUISlice } from "./core/ui.slice";
import { createAuthSlice } from "./core/auth.slice";

// import { createSyncSlice } from "./sync.slice";
// import { createAppSlice } from "./app/app.slice";

import type { AppState } from "./types";

export const useAppStore = create<AppState>()(
	persist(
		immer(
			devtools(
				logger(
					(...a) => ({
						// sync: createSyncSlice(...a),
						init: createInitSlice(...a),
						config: createConfigSlice(...a),
						ui: createUISlice(...a),
						auth: createAuthSlice(...a),
						// navigation: createNavigationSlice(...a),
						// navbar: createNavbarSlice(...a),
						// app: createAppSlice(...a),
					}),
					"IG",
					!import.meta.env.PROD,
				),
				{ enabled: !import.meta.env.PROD },
			),
		),
		{
			name: "ig-store",
			partialize: (state) => ({
				auth: _.pick(state.auth, ["user"]),
				config: state.config,
				// navigation: state.navigation,
			}),
			merge: (persistedState, currentState) => {
				if (persistedState) {
					return _.merge({}, currentState, persistedState);
				}
				return currentState;
			},
		},
	),
);
