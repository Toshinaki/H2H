import { useSmallerThan } from "@ig/hooks";
import { useAppStore } from "store";
import { useShallow } from "zustand/react/shallow";

export const useSidebarFolded = (position: "left" | "right") => {
  const [{ layout: layoutConfig }, { layout: layoutState }] = useAppStore(
    useShallow((state) => [state.config.current.ui, state.ui]),
  );
  const { autofold } = position === "right" ? layoutConfig.rightSidebar : layoutConfig.leftSidebar;
  const { folded } = position === "right" ? layoutState.rightSidebar : layoutState.leftSidebar;

  return autofold.enabled && folded;
};

export const useShouldSidebarFold = (position: "left" | "right") => {
  const foldBreakpoint = useAppStore(
    (state) => state.config.current.ui.layout[`${position}Sidebar`].autofold.breakpoint,
  );
  return useSmallerThan(foldBreakpoint || 0);
};

export const useShouldSidebarClose = (position: "left" | "right") => {
  const closeBreakpoint = useAppStore(
    (state) => state.config.current.ui.layout[`${position}Sidebar`].autohide.breakpoint,
  );
  return useSmallerThan(closeBreakpoint || 0);
};
