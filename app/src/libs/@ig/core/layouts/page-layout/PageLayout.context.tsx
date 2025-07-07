import { createSafeContext } from "@ig/utils/create-safe-context";

export interface PageLayoutContextType {
  leftSidebarOpened: boolean;
  toggleLeftSidebar: (open?: boolean) => void;
  leftBreakpointReached: boolean;
  rightSidebarOpened: boolean;
  toggleRightSidebar: (open?: boolean) => void;
  rightBreakpointReached: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export const [PageLayoutProvider, usePageLayoutContext] = createSafeContext<PageLayoutContextType>(
  "PageLayout component was not found in tree",
);

export const usePageLayoutSidebar = (
  side: "left" | "right" = "left",
): [boolean, (open?: boolean) => void, boolean] => {
  const context = usePageLayoutContext();

  return side === "left"
    ? [context.leftSidebarOpened, context.toggleLeftSidebar, context.leftBreakpointReached]
    : [context.rightSidebarOpened, context.toggleRightSidebar, context.rightBreakpointReached];
};
