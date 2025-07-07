import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@ig/core/layouts/app-layout/Layout";
import Sidebar from "app/components/layout/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout leftSidebar={<Sidebar />} header="headers">
        <Outlet />
      </Layout>

      <TanStackRouterDevtools position="top-left" />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="top-left" />
    </>
  ),
});
