import { useScrollContext } from "@ig/components/scroll/ScrollProvider";
import clsx from "clsx";
import { ScrollArea } from "@ig/components/scroll/ScrollArea";
import type { PageLayoutContentProps } from "./types";
import classes from "./PageLayout.module.css";

const PageLayoutContent = ({
  children,
  scroll,
  scrollOffset,
  ...props
}: React.PropsWithChildren<PageLayoutContentProps>) => {
  const { scrollRef, handleScroll } = useScrollContext();

  return (
    <ScrollArea
      viewportRef={scrollRef}
      onScrollPositionChange={handleScroll}
      disabled={scroll !== "page"}
      //   styles={{ viewport: { scrollPaddingTop: scrollOffset } }}
      {...props}
      className={clsx(classes.content, props.className)}
    >
      {children}
    </ScrollArea>
  );
};

export default PageLayoutContent;
