/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: required for css variables */
import { useAppStore } from "store";
import { useScrollContext } from "@ig/components/scroll/ScrollProvider";
import { getVariables } from "@ig/utils/styles/layout/get-variables";
import { stylesToString } from "@ig/utils/styles/styles-to-string.ts";
import { ScrollArea } from "@ig/components/scroll/ScrollArea";
import LayoutContent, { type LayoutProps } from "./LayoutContent";
import styles from "./Layout.module.css";

const Layout = (props: React.PropsWithChildren<LayoutProps>) => {
  const { leftSidebar, rightSidebar, header } = props;

  const { layout: layoutConfig, scroll, radius } = useAppStore((state) => state.config.current.ui);

  const { media, baseStyles } = getVariables({
    leftSidebar: leftSidebar ? layoutConfig.leftSidebar : undefined,
    rightSidebar: rightSidebar ? layoutConfig.rightSidebar : undefined,
    header: header ? layoutConfig.header : undefined,
  });

  const { scrollRef, handleScroll } = useScrollContext();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: stylesToString({
            selector: "#ig-layout",
            media,
            styles: {
              ...baseStyles,
              "--left-sidebar-radius": `${layoutConfig.leftSidebar.radius ?? radius}px`,
              "--right-sidebar-radius": `${layoutConfig.rightSidebar.radius ?? radius}px`,
            } as React.CSSProperties,
          }),
        }}
      />

      <ScrollArea
        id="ig-layout"
        viewportRef={scrollRef}
        onScrollPositionChange={handleScroll}
        disabled={scroll !== "unset"}
        scrollbars="y"
        data-scroll={scroll}
        data-scheme={layoutConfig.main.darkmode ? "dark" : "light"}
        classNames={{
          root: styles.layoutScroll,
          content: styles.layout,
        }}
      >
        <LayoutContent {...props} />
      </ScrollArea>
    </>
  );
};

export default Layout;
