import { useEffect, useRef } from "react";
import { useSmallerThan, useToggle } from "@ig/hooks";
import { PageLayoutProvider } from "./PageLayout.context";
import type { Breakpoint } from "@ig/configs";
import type { PageLayoutSidebarType } from "./types";

export interface PageLayoutRootProps {
  leftSidebar?: PageLayoutSidebarType;
  rightSidebar?: PageLayoutSidebarType;
  breakpoint?: Breakpoint;
}

const PageLayoutRoot = ({
  leftSidebar,
  rightSidebar,
  breakpoint,
  children,
}: React.PropsWithChildren<PageLayoutRootProps>) => {
  const [leftSidebarOpened, toggleLeftSidebar, setLeftSidebar] = useToggle(!!leftSidebar?.open);
  const [rightSidebarOpened, toggleRightSidebar, setRightSidebar] = useToggle(!!rightSidebar?.open);

  useEffect(() => {
    setLeftSidebar(!!leftSidebar?.open);
  }, [leftSidebar?.open, setLeftSidebar]);

  useEffect(() => {
    setLeftSidebar(!!rightSidebar?.open);
  }, [rightSidebar?.open, setLeftSidebar]);

  const leftBreakpointReached = useSmallerThan(leftSidebar?.breakpoint || breakpoint || "md");
  const rightBreakpointReached = useSmallerThan(rightSidebar?.breakpoint || breakpoint || "md");

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <PageLayoutProvider
      value={{
        leftSidebarOpened,
        toggleLeftSidebar: (open) =>
          open === undefined ? toggleLeftSidebar : setLeftSidebar(open),
        leftBreakpointReached,
        rightSidebarOpened,
        toggleRightSidebar: (open) =>
          open === undefined ? toggleRightSidebar : setRightSidebar(open),
        rightBreakpointReached,
        contentRef,
      }}
    >
      {children}
    </PageLayoutProvider>
  );
};

export default PageLayoutRoot;
