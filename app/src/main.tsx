import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@ig/core/App";
import loaders from "./app/components/init/loaders";
import { loaderActions } from "configs/init.config";
import reactQueryOptions from "configs/react-query.config";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultStructuralSharing: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({ defaultOptions: reactQueryOptions });

// Render the app
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App loaders={loaders} loaderActions={loaderActions}>
					<RouterProvider router={router} />
				</App>
			</QueryClientProvider>
		</StrictMode>,
	);
}
