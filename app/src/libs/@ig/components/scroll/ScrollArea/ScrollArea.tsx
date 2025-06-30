import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useMergeRefs } from "@ig/hooks";
import { rem } from "@ig/utils/rem";
import Box, { type BoxProps } from "@mui/material/Box";
import { ScrollAreaCorner } from "./ScrollAreaCorner/ScrollAreaCorner";
import { ScrollAreaRoot } from "./ScrollAreaRoot/ScrollAreaRoot";
import { ScrollAreaScrollbar } from "./ScrollAreaScrollbar/ScrollAreaScrollbar";
import { ScrollAreaThumb } from "./ScrollAreaThumb/ScrollAreaThumb";
import { ScrollAreaViewport } from "./ScrollAreaViewport/ScrollAreaViewport";

export type ScrollAreaStylesNames =
  | "root"
  | "viewport"
  | "scrollbar"
  | "thumb"
  | "corner"
  | "content";

export interface ScrollAreaProps extends BoxProps<"div"> {
  /** Scrollbar size, any valid CSS value for width/height, numbers are converted to rem, default value is 0.75rem */
  scrollbarSize?: number | string;

  /**
   * Defines scrollbars behavior, `hover` by default
   * - `hover` – scrollbars are visible when mouse is over the scroll area
   * - `scroll` – scrollbars are visible when the scroll area is scrolled
   * - `always` – scrollbars are always visible
   * - `never` – scrollbars are always hidden
   * - `auto` – similar to `overflow: auto` – scrollbars are always visible when the content is overflowing
   * */
  type?: "auto" | "always" | "scroll" | "hover" | "never";

  /** Scroll hide delay in ms, applicable only when type is set to `hover` or `scroll`, `1000` by default */
  scrollHideDelay?: number;

  /** Axis at which scrollbars must be rendered, `'xy'` by default */
  scrollbars?: "x" | "y" | "xy" | false;

  /** Determines whether scrollbars should be offset with padding on given axis, `false` by default */
  offsetScrollbars?: boolean | "x" | "y" | "present";

  /** Assigns viewport element (scrollable container) ref */
  viewportRef?: React.Ref<HTMLDivElement>;

  /** Props passed down to the viewport element */
  viewportProps?: React.ComponentPropsWithRef<"div">;

  /** Called with current position (`x` and `y` coordinates) when viewport is scrolled */
  onScrollPositionChange?: (position: { x: number; y: number }) => void;

  /** Called when scrollarea is scrolled all the way to the bottom */
  onBottomReached?: () => void;

  /** Called when scrollarea is scrolled all the way to the top */
  onTopReached?: () => void;

  /** Defines `overscroll-behavior` of the viewport */
  overscrollBehavior?: React.CSSProperties["overscrollBehavior"];

  ref?: React.RefObject<HTMLDivElement>;
}

export interface ScrollAreaAutosizeProps extends ScrollAreaProps {}

export const ScrollArea = ({ ref, ...props }: ScrollAreaProps) => {
  const {
    scrollbarSize,
    type = "hover",
    scrollHideDelay = 1000,
    viewportProps,
    viewportRef,
    onScrollPositionChange,
    children,
    offsetScrollbars,
    scrollbars = "xy",
    onBottomReached,
    onTopReached,
    overscrollBehavior,
    ...rest
  } = props;

  const [scrollbarHovered, setScrollbarHovered] = useState(false);
  const [verticalThumbVisible, setVerticalThumbVisible] = useState(false);
  const [horizontalThumbVisible, setHorizontalThumbVisible] = useState(false);

  const localViewportRef = useRef<HTMLDivElement>(null);
  const combinedViewportRef = useMergeRefs([viewportRef, localViewportRef]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!localViewportRef.current) {
      return;
    }

    if (offsetScrollbars !== "present") {
      return;
    }

    const element = localViewportRef.current;

    const observer = new ResizeObserver(() => {
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } = element;
      setVerticalThumbVisible(scrollHeight > clientHeight);
      setHorizontalThumbVisible(scrollWidth > clientWidth);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [localViewportRef, offsetScrollbars]);

  const theme = useTheme();

  return (
    <ScrollAreaRoot
      ref={ref}
      type={type === "never" ? "always" : type}
      scrollHideDelay={scrollHideDelay}
      scrollbars={scrollbars}
      {...rest}
      style={
        {
          "--scrollarea-scrollbar-size": rem(scrollbarSize),
          "--scrollarea-over-scroll-behavior": overscrollBehavior,

          "--scrollbar-bg":
            theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
          "--scrollbar-thumb":
            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
          "--scrollbar-thumb-hover":
            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
          ...rest.style,
        } as React.CSSProperties
      }
    >
      <ScrollAreaViewport
        {...viewportProps}
        ref={combinedViewportRef}
        data-offset-scrollbars={offsetScrollbars === true ? "xy" : offsetScrollbars || undefined}
        data-scrollbars={scrollbars || undefined}
        data-horizontal-hidden={
          offsetScrollbars === "present" && !horizontalThumbVisible ? "true" : undefined
        }
        data-vertical-hidden={
          offsetScrollbars === "present" && !verticalThumbVisible ? "true" : undefined
        }
        onScroll={(e) => {
          viewportProps?.onScroll?.(e);
          onScrollPositionChange?.({ x: e.currentTarget.scrollLeft, y: e.currentTarget.scrollTop });
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          // threshold of -0.6 is required for some browsers that use sub-pixel rendering
          if (scrollTop - (scrollHeight - clientHeight) >= -0.6) {
            onBottomReached?.();
          }
          if (scrollTop === 0) {
            onTopReached?.();
          }
        }}
      >
        {children}
      </ScrollAreaViewport>

      {(scrollbars === "xy" || scrollbars === "x") && (
        <ScrollAreaScrollbar
          orientation="horizontal"
          data-hidden={
            type === "never" || (offsetScrollbars === "present" && !horizontalThumbVisible)
              ? true
              : undefined
          }
          forceMount
          onMouseEnter={() => setScrollbarHovered(true)}
          onMouseLeave={() => setScrollbarHovered(false)}
        >
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      )}

      {(scrollbars === "xy" || scrollbars === "y") && (
        <ScrollAreaScrollbar
          orientation="vertical"
          data-hidden={
            type === "never" || (offsetScrollbars === "present" && !verticalThumbVisible)
              ? true
              : undefined
          }
          forceMount
          onMouseEnter={() => setScrollbarHovered(true)}
          onMouseLeave={() => setScrollbarHovered(false)}
        >
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      )}

      <ScrollAreaCorner
        data-hovered={scrollbarHovered || undefined}
        data-hidden={type === "never" || undefined}
      />
    </ScrollAreaRoot>
  );
};

export const ScrollAreaAutosize = (props: ScrollAreaAutosizeProps) => {
  const {
    ref,
    children,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    viewportProps,
    scrollbars,
    style,
    onBottomReached,
    onTopReached,
    ...rest
  } = props;

  return (
    <Box ref={ref} {...rest} style={{ display: "flex", overflow: "auto", ...style }}>
      <Box style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScrollArea
          scrollHideDelay={scrollHideDelay}
          scrollbarSize={scrollbarSize}
          type={type}
          dir={dir}
          offsetScrollbars={offsetScrollbars}
          viewportRef={viewportRef}
          onScrollPositionChange={onScrollPositionChange}
          viewportProps={viewportProps}
          scrollbars={scrollbars}
          onBottomReached={onBottomReached}
          onTopReached={onTopReached}
        >
          {children}
        </ScrollArea>
      </Box>
    </Box>
  );
};

ScrollArea.Autosize = ScrollAreaAutosize;
