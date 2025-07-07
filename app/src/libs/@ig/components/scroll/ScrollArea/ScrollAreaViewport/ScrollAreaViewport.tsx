import { useScrollAreaContext } from "../hooks";
import { useMergedRef } from "@ig/hooks";
import Box, { type BoxProps } from "@mui/material/Box";
import styles from "../ScrollArea.module.css";
import clsx from "clsx";

export interface ScrollAreaViewportProps extends BoxProps<"div"> {
  contentClassName?: string;
}

export const ScrollAreaViewport = ({
  ref,
  children,
  className,
  contentClassName,
  style,
  ...rest
}: ScrollAreaViewportProps) => {
  const ctx = useScrollAreaContext();
  const rootRef = useMergedRef(ref, ctx.onViewportChange);

  return (
    <Box
      ref={rootRef}
      {...rest}
      className={clsx(styles.viewport, className)}
      style={{
        overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
        overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
        ...style,
      }}
    >
      <div ref={ctx.onContentChange} className={clsx(styles.content, contentClassName)}>
        {children}
      </div>
    </Box>
  );
};
