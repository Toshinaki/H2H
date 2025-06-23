import { useScrollAreaContext } from "../hooks";
import { useMergedRef } from "@ig/hooks";
import Box, { type BoxProps } from "@mui/material/Box";
import styles from "../ScrollArea.module.css";

export interface ScrollAreaViewportProps extends BoxProps<"div"> {}

export const ScrollAreaViewport = ({ ref, children, style, ...rest }: ScrollAreaViewportProps) => {
  const ctx = useScrollAreaContext();
  const rootRef = useMergedRef(ref, ctx.onViewportChange);

  return (
    <Box
      ref={rootRef}
      {...rest}
      className={styles.viewport}
      style={{
        overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
        overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
        ...style,
      }}
    >
      <div ref={ctx.onContentChange} className={styles.content}>
        {children}
      </div>
    </Box>
  );
};
