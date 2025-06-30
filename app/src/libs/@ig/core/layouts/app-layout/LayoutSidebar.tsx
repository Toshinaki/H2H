import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "store";
import { useShouldSidebarClose, useShouldSidebarFold } from "./hooks";
import clsx from "clsx";
import _ from "@lodash";
import getTheme from "@ig/utils/getTheme";
import { ThemeProvider } from "@mui/material/styles";
import Drawer, { type DrawerProps } from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styles from "./Layout.module.css";

export interface LayoutSidebarProps
  extends Omit<
    DrawerProps,
    "variant" | "anchor" | "open" | "onOpen" | "onClose" | "onMouseEnter" | "onMouseLeave"
  > {
  position: "left" | "right";
}

const LayoutSidebar = ({ position, children, className, ...props }: LayoutSidebarProps) => {
  const [
    { layout: layoutConfig, radius: defaultRadius },
    {
      layout: layoutState,
      toggleSidebarHiddenOpen,
      toggleSidebarOpen,
      toggleSidebarFold,
      toggleSidebarFoldedOpen,
    },
    userPreferFold,
  ] = useAppStore(
    useShallow((state) => [
      state.config.current.ui,
      state.ui,
      state.auth.user.preference.ui?.layout?.[`${position}Sidebar`]?.folded,
    ]),
  );
  const {
    autohide,
    fold,
    // size,
    radius,
    // offset,
    theme: themeId,
    darkmode,
  } = layoutConfig[`${position}Sidebar`];
  const { opened, hiddenOpened, folded, foldedOpened } = layoutState[`${position}Sidebar`];

  const shouldAutoClose = useShouldSidebarClose(position);
  const shouldAutoFold = useShouldSidebarFold(position);
  useEffect(() => {
    if (shouldAutoClose) {
      toggleSidebarHiddenOpen(position, false);
    }
  }, [shouldAutoClose, position, toggleSidebarHiddenOpen]);
  useEffect(() => {
    if (fold.enabled) {
      if (shouldAutoFold && !folded) {
        toggleSidebarFold(position, true);
        toggleSidebarFoldedOpen(position, false);
      }
      if (!shouldAutoFold && folded && !userPreferFold) {
        toggleSidebarFold(position, false);
      }
    }
  }, [
    fold.enabled,
    folded,
    position,
    shouldAutoFold,
    userPreferFold,
    toggleSidebarFold,
    toggleSidebarFoldedOpen,
  ]);
  const sidebarFolded = fold.enabled && folded;

  const id = `${position}-sidebar`;
  const theme = getTheme({
    id: themeId,
    cssVariables: { cssVarPrefix: "ig", rootSelector: `#${id}` },
  });

  const sidebarFoldedClosed = sidebarFolded && !layoutState[`${position}Sidebar`].foldedOpened;
  const contentWidth = `calc(${
    sidebarFoldedClosed
      ? layoutConfig[`${position}Sidebar`].fold.size
      : layoutConfig[`${position}Sidebar`].size
  }px - ${layoutConfig[`${position}Sidebar`].offset}px)`;

  return (
    <ThemeProvider theme={theme}>
      {autohide.enabled && shouldAutoClose && (
        <SwipeableDrawer
          id={id}
          data-scheme={darkmode ? "dark" : "light"}
          anchor={position}
          open={hiddenOpened}
          onClose={() => toggleSidebarHiddenOpen(position)}
          onOpen={() => toggleSidebarHiddenOpen(position)}
          disableSwipeToOpen
          {...props}
        >
          {children}
        </SwipeableDrawer>
      )}

      {(!autohide.enabled || !shouldAutoClose) && (
        <Drawer
          id={id}
          component="aside"
          data-scheme={darkmode ? "dark" : "light"}
          data-folded={sidebarFolded}
          data-folded-opened={!!foldedOpened}
          variant="persistent"
          anchor={position}
          open={opened}
          onClose={() => toggleSidebarOpen(position)}
          onMouseEnter={sidebarFolded ? () => toggleSidebarFoldedOpen(position, true) : undefined}
          onMouseLeave={sidebarFolded ? () => toggleSidebarFoldedOpen(position, false) : undefined}
          {...props}
          className={clsx(styles.sidebar, className)}
          style={{
            width: `var(--${position}-sidebar-wrapper-width)`,
            borderRadius: radius ?? defaultRadius,
            ...props.style,
          }}
          slotProps={_.merge(
            {},
            {
              paper: {
                elevation: 3,
                className: styles.sidebarWrapper,
                style: {
                  width: contentWidth,
                  height: `calc(100% - ${layoutConfig[`${position}Sidebar`].offset * 2}px)`,
                  margin: `${layoutConfig[`${position}Sidebar`].offset}px`,
                  ...(position === "right" ? { marginLeft: 0 } : { marginRight: 0 }),
                } as React.CSSProperties,
              },
            },
            props.slotProps,
          )}
        >
          {children}
        </Drawer>
      )}
    </ThemeProvider>
  );
};

export default LayoutSidebar;
