import clsx from "clsx";
import _ from "@lodash";
import { Stack } from "@mui/material";
import PageLayoutRoot from "./PageLayoutRoot";
import PageLayoutSidebar from "./PageLayoutSidebar";
import type { PageLayoutProps } from "./types";
import styles from "./PageLayout.module.css";
import PageLayoutContentWrapper from "./PageLayoutContentWrapper";
import PageLayoutHeader from "./PageLayoutHeader";
import PageLayoutContent from "./PageLayoutContent";

const PageLayout = (props: React.PropsWithChildren<PageLayoutProps>) => {
  const {
    ref,
    header,
    leftSidebar,
    rightSidebar,
    breakpoint,
    scroll = "page",
    scrollOffset,
    children,
    classNames,
    ...rest
  } = props;

  return (
    <PageLayoutRoot leftSidebar={leftSidebar} rightSidebar={rightSidebar} breakpoint={breakpoint}>
      <Stack ref={ref} {...rest} className={clsx(styles.root, classNames?.root)}>
        <Stack className={clsx(styles.container, classNames?.container)}>
          <div className={clsx(styles.wrapper, classNames?.wrapper)}>
            {/* left sidebar */}
            {leftSidebar && (
              <PageLayoutSidebar
                position="left"
                {..._.omit(leftSidebar, ["open", "breakpoint"])}
                className={clsx(classNames?.sidebar, classNames?.leftSidebar)}
              />
            )}

            <PageLayoutContentWrapper className={classNames?.contentWrapper}>
              {header && <PageLayoutHeader {...header} className={classNames?.header} />}

              <PageLayoutContent
                scroll={scroll}
                scrollOffset={scrollOffset}
                className={classNames?.content}
              >
                {children}
              </PageLayoutContent>
            </PageLayoutContentWrapper>

            {/* right right */}
            {rightSidebar && (
              <PageLayoutSidebar
                position="right"
                {..._.omit(rightSidebar, ["open", "breakpoint"])}
                className={clsx(classNames?.sidebar, classNames?.rightSidebar)}
              />
            )}
          </div>
        </Stack>
      </Stack>
    </PageLayoutRoot>
  );
};

export default PageLayout;
