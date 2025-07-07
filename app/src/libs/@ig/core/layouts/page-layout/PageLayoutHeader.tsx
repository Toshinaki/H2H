import { usePageLayoutContext } from "./PageLayout.context";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { PageLayoutHeaderProps } from "./types";
import classes from "./PageLayout.module.css";

const PageLayoutHeader = (props: PageLayoutHeaderProps) => {
  const { content, withToggleButton, buttonProps, leftToggleIcon, rightToggleIcon, className } =
    props;
  const { leftSidebarOpened, toggleLeftSidebar, rightSidebarOpened, toggleRightSidebar } =
    usePageLayoutContext();

  const IconLeftOpen = leftToggleIcon?.open || ChevronRightIcon;
  const IconLeftClose = leftToggleIcon?.close || ChevronLeftIcon;
  const IconRightOpen = rightToggleIcon?.open || ChevronLeftIcon;
  const IconRightClose = rightToggleIcon?.close || ChevronRightIcon;

  return (
    <div className={clsx(classes.header, className)}>
      {withToggleButton?.left && (
        <IconButton
          {...buttonProps}
          onClick={() => toggleLeftSidebar()}
          className={clsx(classes.toggleButton, classes.left, buttonProps?.className)}
        >
          {leftSidebarOpened ? <IconLeftClose /> : <IconLeftOpen />}
        </IconButton>
      )}

      {content}

      {withToggleButton?.right && (
        <IconButton
          {...buttonProps}
          onClick={() => toggleRightSidebar()}
          className={clsx(classes.toggleButton, classes.right, buttonProps?.className)}
        >
          {rightSidebarOpened ? <IconRightClose /> : <IconRightOpen />}
        </IconButton>
      )}
    </div>
  );
};

export default PageLayoutHeader;
