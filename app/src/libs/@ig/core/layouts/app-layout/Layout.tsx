import { useAppStore } from "store";
import styles from "./Layout.module.css";
import LayoutSidebar from "./LayoutSidebar";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

const Layout = ({
  header,
  footer,
  leftSidebar,
  rightSidebar,
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  const { layout: layoutConfig, scroll, scale } = useAppStore((state) => state.config.current.ui);

  return (
    <div
      data-scroll={scroll}
      data-scheme={layoutConfig.main.darkmode ? "dark" : "light"}
      className={styles.layout}
      style={{ "--app-scale": scale } as React.CSSProperties}
    >
      {layoutConfig.leftSidebar.show && !layoutConfig.leftSidebar.inner && leftSidebar && (
        <LayoutSidebar position="left">{leftSidebar}</LayoutSidebar>
      )}

      <div className={styles.outerWrapper}>
        {layoutConfig.header.show && !layoutConfig.header.inner && header && (
          <header>{header}</header>
        )}

        <div className={styles.content}>
          {layoutConfig.leftSidebar.show && layoutConfig.leftSidebar.inner && leftSidebar && (
            <LayoutSidebar position="left">{leftSidebar}</LayoutSidebar>
          )}

          <div className={styles.innerWrapper}>
            {layoutConfig.header.show && layoutConfig.header.inner && header && (
              <header>{header}</header>
            )}

            <main>{children}</main>

            {layoutConfig.footer.show && layoutConfig.footer.inner && footer && (
              <footer>{footer}</footer>
            )}
          </div>

          {layoutConfig.rightSidebar.show && layoutConfig.rightSidebar.inner && rightSidebar && (
            <LayoutSidebar position="right">{rightSidebar}</LayoutSidebar>
          )}
        </div>

        {layoutConfig.footer.show && !layoutConfig.footer.inner && footer && (
          <footer>{footer}</footer>
        )}
      </div>

      {layoutConfig.rightSidebar.show && !layoutConfig.rightSidebar.inner && rightSidebar && (
        <LayoutSidebar position="right">{rightSidebar}</LayoutSidebar>
      )}
    </div>
  );
};

export default Layout;
