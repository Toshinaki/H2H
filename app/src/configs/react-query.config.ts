import type { DefaultOptions } from "@tanstack/react-query";

export default {
	queries: {
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
		retry: false,
		staleTime: 24 * 60 * 60 * 1000,
		throwOnError: true,
	},
} as DefaultOptions;
