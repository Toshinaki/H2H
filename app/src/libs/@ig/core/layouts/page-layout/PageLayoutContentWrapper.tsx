import { usePageLayoutContext } from "./PageLayout.context";
import clsx from "clsx";
import { Stack, type StackProps } from "@mui/material";
import styles from "./PageLayout.module.css";

const PageLayoutContentWrapper = ({ children, ...props }: StackProps) => {
  const { leftSidebarOpened, rightSidebarOpened, contentRef } = usePageLayoutContext();

  return (
    <Stack
      ref={contentRef}
      {...props}
      className={clsx(
        styles.contentWrapper,
        props.className,
        leftSidebarOpened && styles.leftOpened,
        rightSidebarOpened && styles.rightOpened,
      )}
    >
      {children}
    </Stack>
  );
};

export default PageLayoutContentWrapper;
