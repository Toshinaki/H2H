import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Layout from "@ig/core/layouts/app-layout/Layout";
import Sidebar from "app/components/layout/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout leftSidebar={<Sidebar />}>
        <Outlet />
      </Layout>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
