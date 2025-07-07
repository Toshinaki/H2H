import { PageLayout } from "@ig/core/layouts/page-layout";
import DownloadPage from "app/components/pages/download/DownloadPage";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      header={{
        content: "Downloads",
      }}
      leftSidebar={{
        content: "left",
        open: true,
      }}
      rightSidebar={{
        content: "right",
        open: true,
      }}
    >
      <DownloadPage />
    </PageLayout>
  );
}
