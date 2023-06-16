import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { Notifications } from "@mantine/notifications";
import ConfigProvider from "./state/AppContext";
import Suspense from "@ishtar/components/Suspense";
import Layout from "@ishtar/components/layout";
// import ErrorBoundary from "./state/ErrorBoundary";

// pages
const DownloadPage = lazy(() => import("./pages/DownloadPage"));
const VideoContent = lazy(() => import("./pages/DownloadPage/components/VideoContent"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DownloadPage />,
    children: [
      {
        path: ":vid",
        element: (
          <Suspense>
            <VideoContent />
          </Suspense>
        ),
      },
    ],
  },
  // {
  //   path: "*",
  //   element: (
  //     <Suspense>
  //       <NotFount />
  //     </Suspense>
  //   ),
  // },
];

const App = () => {
  const elements = useRoutes(routes);

  return (
    <ConfigProvider>
      {/* <ErrorBoundary> */}

      <Layout>{elements}</Layout>
      <Notifications />
      {/* </ErrorBoundary> */}
    </ConfigProvider>
  );
};

export default App;
