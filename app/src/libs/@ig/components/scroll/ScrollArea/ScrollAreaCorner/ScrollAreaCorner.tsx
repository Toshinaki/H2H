import { useState } from "react";
import { useScrollAreaContext } from "../hooks";
import { useResizeObserver } from "../use-resize-observer";
import styles from "../ScrollArea.module.css";

interface ScrollAreaCornerProps extends React.ComponentPropsWithoutRef<"div"> {
  ref?: React.RefObject<HTMLDivElement>;
}

export const Corner = (props: ScrollAreaCornerProps) => {
  const { ref, style, ...rest } = props;
  const ctx = useScrollAreaContext();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const hasSize = Boolean(width && height);

  useResizeObserver(ctx.scrollbarX, () => {
    const h = ctx.scrollbarX?.offsetHeight || 0;
    ctx.onCornerHeightChange(h);
    setHeight(h);
  });

  useResizeObserver(ctx.scrollbarY, () => {
    const w = ctx.scrollbarY?.offsetWidth || 0;
    ctx.onCornerWidthChange(w);
    setWidth(w);
  });

  return hasSize ? (
    <div ref={ref} {...rest} className={styles.corner} style={{ ...style, width, height }} />
  ) : null;
};

export const ScrollAreaCorner = ({ ref, ...props }: ScrollAreaCornerProps) => {
  const ctx = useScrollAreaContext();
  const hasBothScrollbarsVisible = Boolean(ctx.scrollbarX && ctx.scrollbarY);
  const hasCorner = ctx.type !== "scroll" && hasBothScrollbarsVisible;
  return hasCorner ? <Corner ref={ref} {...props} /> : null;
};
