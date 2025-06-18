import { useAppStore } from "store";
import { ThemeProvider } from "@mui/material/styles";
import { useShallow } from "zustand/react/shallow";
import { useSmallerThan } from "@ig/hooks";
import getTheme from "@ig/utils/getTheme";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";

interface LayoutSidebarProps {
  position: "left" | "right";
}

const LayoutSidebar = ({ position, children }: React.PropsWithChildren<LayoutSidebarProps>) => {
  const [
    { layout: layoutConfig, radius: defaultRadius },
    { layout: layoutState, toggleSidebarHiddenOpen, toggleSidebarOpen },
  ] = useAppStore(useShallow((state) => [state.config.current.ui, state.ui]));
  const {
    autohide,
    fold,
    size,
    radius,
    offset,
    theme: themeId,
  } = position === "right" ? layoutConfig.rightSidebar : layoutConfig.leftSidebar;
  const { opened, hiddenOpened, folded, foldOpened } =
    position === "right" ? layoutState.rightSidebar : layoutState.leftSidebar;

  const content = (
    <Box component="aside" data-fold-opened={foldOpened} sx={{}}>
      {children}
    </Box>
  );

  const isSmallScreen = useSmallerThan(autohide.breakpoint);
  const shouldFold = useSmallerThan(fold.breakpoint || 0);

  const id = `${position}-sidebar`;

  const theme = getTheme({
    id: themeId,
    cssVarPrefix: "sidebar",
    rootSelector: `#${id}`,
  });

  const width = `${(((fold.enabled && folded) || shouldFold) && fold.size) || size}px`;

  return (
    <ThemeProvider theme={theme}>
      {autohide.enabled && isSmallScreen && (
        <SwipeableDrawer
          id={id}
          anchor={position}
          open={hiddenOpened}
          onClose={() => toggleSidebarHiddenOpen(position)}
          onOpen={() => toggleSidebarHiddenOpen(position)}
          disableSwipeToOpen
        >
          {content}
        </SwipeableDrawer>
      )}

      {(!autohide.enabled || !isSmallScreen) && (
        <Drawer
          id={id}
          variant="persistent"
          anchor={position}
          open={opened}
          onClose={() => toggleSidebarOpen(position)}
          sx={{
            width,
            height: "100%",
            borderRadius: radius ?? defaultRadius,
            transition: (theme) => theme.transitions.create("width"),
          }}
          slotProps={{
            paper: {
              sx: {
                width: `calc(${width} - ${offset}px)`,
                height: `calc(100% - ${offset * 2}px)`,
                margin: `${offset}px`,
                ...(position === "right" ? { marginLeft: 0 } : { marginRight: 0 }),
                transition: (theme) => theme.transitions.create("width"),
              },
            },
          }}
        >
          {content}
        </Drawer>
      )}
    </ThemeProvider>
  );
};

export default LayoutSidebar;
