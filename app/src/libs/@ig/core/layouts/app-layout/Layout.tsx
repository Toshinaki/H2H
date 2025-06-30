import { useAppStore } from "store";
import { useShallow } from "zustand/react/shallow";
import LayoutSidebar, { type LayoutSidebarProps } from "./LayoutSidebar";
import styles from "./Layout.module.css";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  leftSidebarProps?: Omit<LayoutSidebarProps, "position">;
  rightSidebar?: React.ReactNode;
  rightSidebarProps?: Omit<LayoutSidebarProps, "position">;
}

const Layout = ({
  header,
  footer,
  leftSidebar,
  leftSidebarProps,
  rightSidebar,
  rightSidebarProps,
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  const [{ layout: layoutConfig, scroll }, { layout: layoutState }] = useAppStore(
    useShallow((state) => [state.config.current.ui, state.ui]),
  );

  const leftSidebarOpened = leftSidebar && layoutState.leftSidebar.opened;
  const leftSidebarFolded =
    leftSidebar && layoutConfig.leftSidebar.fold.enabled && layoutState.leftSidebar.folded;
  const leftSidebarWrapperWidth = `${leftSidebarFolded ? layoutConfig.leftSidebar.fold.size : layoutConfig.leftSidebar.size}px`;

  const rightSidebarOpened = rightSidebar && layoutState.rightSidebar.opened;
  const rightSidebarFolded =
    rightSidebar && layoutConfig.rightSidebar.fold.enabled && layoutState.rightSidebar.folded;
  const rightSidebarWrapperWidth = `${rightSidebarFolded ? layoutConfig.rightSidebar.fold.size : layoutConfig.rightSidebar.size}px`;

  const cssVariables = {
    "--left-sidebar-wrapper-width": leftSidebarWrapperWidth,
    "--left-sidebar-offset": `${layoutConfig.leftSidebar.offset}px`,
    "--right-sidebar-wrapper-width": rightSidebarWrapperWidth,
    "--right-sidebar-offset": `${layoutConfig.rightSidebar.offset}px`,
  };

  const hasLeftSidebar = layoutConfig.leftSidebar.show && leftSidebar;
  const hasRightSidebar = layoutConfig.rightSidebar.show && rightSidebar;

  return (
    <div
      id="ig-layout"
      data-scroll={scroll}
      data-scheme={layoutConfig.main.darkmode ? "dark" : "light"}
      className={styles.layout}
      style={cssVariables as React.CSSProperties}
    >
      {hasLeftSidebar && !layoutConfig.leftSidebar.inner && (
        <LayoutSidebar position="left" {...leftSidebarProps}>
          {leftSidebar}
        </LayoutSidebar>
      )}

      <div
        {...(layoutConfig.leftSidebar.inner
          ? {}
          : { "data-left-sidebar-opened": leftSidebarOpened })}
        {...(layoutConfig.rightSidebar.inner
          ? {}
          : { "data-right-sidebar-opened": rightSidebarOpened })}
        className={styles.outerWrapper}
      >
        {layoutConfig.header.show && !layoutConfig.header.inner && header && (
          <header>{header}</header>
        )}

        <div className={styles.content}>
          {hasLeftSidebar && layoutConfig.leftSidebar.inner && (
            <LayoutSidebar position="left" {...leftSidebarProps}>
              {leftSidebar}
            </LayoutSidebar>
          )}

          <div
            {...(!layoutConfig.leftSidebar.inner
              ? {}
              : { "data-left-sidebar-opened": leftSidebarOpened })}
            {...(!layoutConfig.rightSidebar.inner
              ? {}
              : { "data-right-sidebar-opened": rightSidebarOpened })}
            className={styles.innerWrapper}
          >
            {layoutConfig.header.show && layoutConfig.header.inner && header && (
              <header>{header}</header>
            )}

            <main>{children}</main>

            {layoutConfig.footer.show && layoutConfig.footer.inner && footer && (
              <footer>{footer}</footer>
            )}
          </div>

          {hasRightSidebar && layoutConfig.rightSidebar.inner && (
            <LayoutSidebar position="right" {...rightSidebarProps}>
              {rightSidebar}
            </LayoutSidebar>
          )}
        </div>

        {layoutConfig.footer.show && !layoutConfig.footer.inner && footer && (
          <footer>{footer}</footer>
        )}
      </div>

      {hasRightSidebar && !layoutConfig.rightSidebar.inner && (
        <LayoutSidebar position="right" {...rightSidebarProps}>
          {rightSidebar}
        </LayoutSidebar>
      )}
    </div>
  );
};

export default Layout;
