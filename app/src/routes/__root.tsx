import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Layout from "@ig/core/layouts/app-layout/Layout";
import { StandardNavbar } from "@ig/core/layouts/navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout
        leftSidebar={
          <StandardNavbar
            navigations={[
              {
                id: "test",
                type: "item",
                name: "Test",
                path: "/about",
              },
              {
                id: "test2",
                type: "item",
                name: "Test2",
                path: "/about",
              },
              {
                id: "divider-1",
                type: "divider",
              },
              {
                id: "test3",
                type: "item",
                name: "Test3",
                path: "/about",
              },
              {
                id: "test-g",
                type: "group",
                name: "Test Group",
                items: [
                  {
                    id: "test4",
                    type: "item",
                    name: "Test4",
                    path: "/about",
                  },
                  {
                    id: "test5",
                    type: "item",
                    name: "Test5",
                    path: "/about",
                  },
                  {
                    id: "test6",
                    type: "item",
                    name: "Test6",
                    path: "/about",
                  },
                ],
              },
              {
                id: "test-c",
                type: "collapse",
                name: "Test Collapse",
                items: [
                  {
                    id: "test7",
                    type: "item",
                    name: "Test7",
                    path: "/about",
                  },
                  {
                    id: "test8",
                    type: "item",
                    name: "Test8",
                    path: "/about",
                  },
                  {
                    id: "test9",
                    type: "item",
                    name: "Test9",
                    path: "/about",
                  },
                ],
              },
              {
                id: "test-g2",
                type: "group",
                name: "Test Group2",
                items: [
                  {
                    id: "test42",
                    type: "item",
                    name: "Test42",
                    path: "/about",
                  },
                  {
                    id: "test52",
                    type: "item",
                    name: "Test52",
                    path: "/about",
                  },
                  {
                    id: "test62",
                    type: "item",
                    name: "Test62",
                    path: "/about",
                  },
                  {
                    id: "test-c2",
                    type: "collapse",
                    name: "Test Collapse2",
                    items: [
                      {
                        id: "test72",
                        type: "item",
                        name: "Test72",
                        path: "/about",
                      },
                      {
                        id: "test82",
                        type: "item",
                        name: "Test82",
                        path: "/about",
                      },
                      {
                        id: "test92",
                        type: "item",
                        name: "Test92",
                        path: "/about",
                      },
                    ],
                  },
                ],
              },
              {
                id: "test-l",
                type: "link",
                name: "Test Link",
                path: "www.google.com",
              },
            ]}
          />
        }
      >
        <Outlet />
      </Layout>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
