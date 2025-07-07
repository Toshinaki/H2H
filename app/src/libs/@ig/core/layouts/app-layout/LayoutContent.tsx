import { useAppStore } from "store";
import { useShallow } from "zustand/react/shallow";
import LayoutHeader from "./LayoutHeader";
import LayoutSidebar, { type LayoutSidebarProps } from "./LayoutSidebar";
import styles from "./Layout.module.css";
import { ScrollArea } from "@ig/components/scroll/ScrollArea";
import { useScrollContext } from "@ig/components/scroll/ScrollProvider";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  leftSidebarProps?: Omit<LayoutSidebarProps, "position">;
  rightSidebar?: React.ReactNode;
  rightSidebarProps?: Omit<LayoutSidebarProps, "position">;
}

const LayoutContent = (props: React.PropsWithChildren<LayoutProps>) => {
  const {
    header,
    footer,
    leftSidebar,
    leftSidebarProps,
    rightSidebar,
    rightSidebarProps,
    children,
  } = props;

  const [{ layout: layoutConfig, scroll }, { layout: layoutState }] = useAppStore(
    useShallow((state) => [state.config.current.ui, state.ui]),
  );

  const leftSidebarOpened = leftSidebar && layoutState.leftSidebar.opened;
  const rightSidebarOpened = rightSidebar && layoutState.rightSidebar.opened;
  const leftsidebar = layoutConfig.leftSidebar.show && leftSidebar && (
    <LayoutSidebar position="left" {...leftSidebarProps}>
      {leftSidebar}
    </LayoutSidebar>
  );
  const rightsidebar = layoutConfig.rightSidebar.show && rightSidebar && (
    <LayoutSidebar position="right" {...rightSidebarProps}>
      {rightSidebar}
    </LayoutSidebar>
  );

  const _header = layoutConfig.header.show && header && <LayoutHeader>{header}</LayoutHeader>;

  const { scrollRef, handleScroll } = useScrollContext();
  return (
    <>
      {!layoutConfig.leftSidebar.inner && leftsidebar}

      <ScrollArea
        viewportRef={scrollRef}
        onScrollPositionChange={handleScroll}
        disabled={scroll !== "content"}
        {...(layoutConfig.leftSidebar.inner
          ? {}
          : {
              "data-left-sidebar-opened": leftSidebarOpened,
              "data-left-sidebar-folded": layoutState.leftSidebar.folded,
            })}
        {...(layoutConfig.rightSidebar.inner
          ? {}
          : {
              "data-right-sidebar-opened": rightSidebarOpened,
              "data-right-sidebar-folded": layoutState.rightSidebar.folded,
            })}
        classNames={{
          root: styles.outerWrapperScroll,
          content: styles.outerWrapper,
        }}
      >
        {!layoutConfig.header.inner && _header}

        <div className={styles.content}>
          {layoutConfig.leftSidebar.inner && leftsidebar}

          <div
            {...(!layoutConfig.leftSidebar.inner
              ? {}
              : {
                  "data-left-sidebar-opened": leftSidebarOpened,
                  "data-left-sidebar-folded": layoutState.leftSidebar.folded,
                })}
            {...(!layoutConfig.rightSidebar.inner
              ? {}
              : {
                  "data-right-sidebar-opened": rightSidebarOpened,
                  "data-right-sidebar-folded": layoutState.rightSidebar.folded,
                })}
            className={styles.innerWrapper}
          >
            {layoutConfig.header.inner && _header}

            <main>{children}</main>

            {layoutConfig.footer.show && layoutConfig.footer.inner && footer && (
              <footer>{footer}</footer>
            )}
          </div>

          {layoutConfig.rightSidebar.inner && rightsidebar}
        </div>

        {layoutConfig.footer.show && !layoutConfig.footer.inner && footer && (
          <footer>{footer}</footer>
        )}
      </ScrollArea>

      {!layoutConfig.rightSidebar.inner && rightsidebar}
    </>
  );
};

export default LayoutContent;
