import { useState } from "react";
import { useMergedRef } from "@ig/hooks";
import clsx from "clsx";
import ScrollAreaContext from "../ScrollArea.context";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";
import styles from "../ScrollArea.module.css";

export interface ScrollAreaRootStylesCtx {
  cornerWidth: number;
  cornerHeight: number;
}

export interface ScrollAreaRootProps extends BoxProps<"div"> {
  ref?: React.RefObject<HTMLDivElement>;
  type?: "auto" | "always" | "scroll" | "hover" | "never";
  scrollbars?: "x" | "y" | "xy" | false;
  scrollHideDelay?: number;
}

export const ScrollAreaRoot = (props: ScrollAreaRootProps) => {
  const {
    ref,
    type = "hover",
    scrollHideDelay = 1000,
    scrollbars,
    className,
    style,
    ...rest
  } = props;

  const [scrollArea, setScrollArea] = useState<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [content, setContent] = useState<HTMLDivElement | null>(null);
  const [scrollbarX, setScrollbarX] = useState<HTMLDivElement | null>(null);
  const [scrollbarY, setScrollbarY] = useState<HTMLDivElement | null>(null);
  const [cornerWidth, setCornerWidth] = useState(0);
  const [cornerHeight, setCornerHeight] = useState(0);
  const [scrollbarXEnabled, setScrollbarXEnabled] = useState(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = useState(false);
  const rootRef = useMergedRef(ref, (node) => setScrollArea(node));

  return (
    <ScrollAreaContext.Provider
      value={{
        type,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
      }}
    >
      <Box
        ref={rootRef}
        {...rest}
        className={clsx(styles.root, className)}
        style={
          {
            "--sa-corner-width": scrollbars !== "xy" ? "0px" : `${cornerWidth}px`,
            "--sa-corner-height": scrollbars !== "xy" ? "0px" : `${cornerHeight}px`,
            ...style,
          } as React.CSSProperties
        }
      />
    </ScrollAreaContext.Provider>
  );
};
