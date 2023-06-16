import { forwardRef, memo, useState } from "react";
import { useDebounce } from "@ishtar/hooks";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Box, DefaultProps, Selectors, useMantineTheme } from "@mantine/core";
import useStyles, { ScrollbarStylesParams } from "./Scrollbar.styles";

type Props = React.PropsWithoutRef<React.HTMLProps<HTMLDivElement>> &
  Pick<ScrollArea.ScrollAreaProps, "type" | "scrollHideDelay" | "dir"> & {
    /** Scrollbar size in px */
    scrollbarSize?: number;

    /** Should scrollbars be offset with padding */
    offsetScrollbars?: boolean;

    /** Get viewport ref */
    viewportRef?: React.ForwardedRef<HTMLDivElement>;

    /** Subscribe to scroll position changes */
    onScrollPositionChange?(position: { x: number; y: number }): void;
    onScrollTop?(): void;
    onScrollBottom?(): void;
    scrollOffsets?: { top?: number; bottom?: number; left?: number; right?: number };

    hideX?: boolean;
    hideY?: boolean;
    enabled?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
  };

export interface ScrollbarProps
  extends DefaultProps<Selectors<typeof useStyles>, ScrollbarStylesParams>,
    Props {}

const Scrollbar = forwardRef<HTMLDivElement, React.PropsWithChildren<ScrollbarProps>>(
  (props, ref) => {
    const [hovered, setHovered] = useState(false);

    const theme = useMantineTheme();

    const {
      type = "hover",
      scrollHideDelay = 300,
      dir = theme.dir,
      scrollbarSize = 10,
      offsetScrollbars,
      viewportRef,
      onScrollPositionChange,
      onScrollTop,
      onScrollBottom,
      scrollOffsets,
      hideX,
      hideY,
      enabled = true,
      classNames,
      styles,
      children,
      fullHeight,
      fullWidth = true,
      ...rest
    } = props;

    const { classes, cx } = useStyles(
      { scrollbarSize, offsetScrollbars, hovered, enabled, fullHeight, fullWidth },
      { name: "scroll-bar", classNames, styles }
    );

    const onScroll = useDebounce((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = event.target as HTMLDivElement;
      onScrollPositionChange?.({
        x: element.scrollLeft,
        y: element.scrollTop,
      });
      if (onScrollTop) {
        const top =
          scrollOffsets?.top && scrollOffsets.top > 0
            ? scrollOffsets.top >= 1
              ? scrollOffsets.top
              : scrollOffsets.top > 0.5
              ? 0.5 * element.scrollHeight
              : scrollOffsets.top * element.scrollHeight
            : 0;
        if (element.scrollTop <= top) {
          onScrollTop();
        }
      }
      if (onScrollBottom) {
        const bottom =
          scrollOffsets?.bottom && scrollOffsets.bottom > 0
            ? scrollOffsets.bottom >= 1
              ? scrollOffsets.bottom
              : scrollOffsets.bottom > 0.5
              ? 0.5 * element.scrollHeight
              : scrollOffsets.bottom * element.scrollHeight
            : 0;
        if (element.scrollTop >= element.scrollHeight - element.offsetHeight - bottom) {
          onScrollBottom();
        }
      }
    }, 200);

    return enabled ? (
      <Box
        ref={ref}
        component={ScrollArea.Root}
        type={type}
        scrollHideDelay={scrollHideDelay}
        dir={dir}
        {...rest}
        className={cx(classes?.root, rest.className)}
      >
        <Box
          ref={viewportRef}
          component={ScrollArea.Viewport}
          onScroll={onScroll}
          className={classes?.viewport}
        >
          {children}
        </Box>
        {!hideX && (
          <Box
            component={ScrollArea.Scrollbar}
            orientation="horizontal"
            forceMount
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={classes?.scrollbar}
          >
            <Box component={ScrollArea.Thumb} className={cx("thumb", classes?.thumb)} />
          </Box>
        )}
        {!hideY && (
          <Box
            component={ScrollArea.Scrollbar}
            orientation="vertical"
            forceMount
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={classes?.scrollbar}
          >
            <Box component={ScrollArea.Thumb} className={cx("thumb", classes?.thumb)} />
          </Box>
        )}
        <Box component={ScrollArea.Corner} className={classes?.corner} />
      </Box>
    ) : (
      <Box {...rest} className={cx(classes?.root, rest.className)}>
        {children}
      </Box>
    );
  }
);
// Scrollbar.defaultProps = {
//   enabled: true,
// };

export default memo(Scrollbar) as typeof Scrollbar;
