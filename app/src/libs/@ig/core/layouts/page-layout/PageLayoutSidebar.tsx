import { usePageLayoutSidebar } from "./PageLayout.context";
import clsx from "clsx";
import _ from "@lodash";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import type { PageLayoutSidebarProps } from "./types";
import styles from "./PageLayout.module.css";

const PageLayoutSidebar = (props: PageLayoutSidebarProps) => {
  const {
    content,
    onClose,
    withCloseButton,
    withBorder = true,
    customScroll,
    position,
    className,
    ...rest
  } = props;

  const [isOpened, toggleOpen, breakpointReached] = usePageLayoutSidebar(position);

  const handleClose = () => {
    onClose?.();
    toggleOpen(false);
  };

  return (
    <>
      {breakpointReached && (
        <SwipeableDrawer
          anchor={position}
          open={isOpened}
          onClose={handleClose}
          onOpen={() => toggleOpen(true)}
          disableSwipeToOpen
          {...rest}
        >
          {content}
        </SwipeableDrawer>
      )}

      {!breakpointReached && (
        <Drawer
          variant="persistent"
          anchor={position}
          open={isOpened}
          onClose={handleClose}
          {...rest}
          className={clsx(styles.sidebar, styles[`${position}Sidebar`], className)}
          slotProps={_.merge(
            {},
            { paper: { elevation: withBorder ? 3 : 0, className: styles.sidebarInner } },
            props.slotProps,
          )}
        >
          {content}
        </Drawer>
      )}
    </>
  );
};

export default PageLayoutSidebar;
