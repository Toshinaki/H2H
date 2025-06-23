import { useState } from "react";
import { useResizeObserver } from "../use-resize-observer";
import {
  ScrollAreaScrollbarVisible,
  type ScrollAreaScrollbarVisibleProps,
} from "./ScrollAreaScrollbarVisible";
import { useScrollAreaContext } from "../hooks";
import { useDebouncedCallback } from "@ig/hooks";

export interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export const ScrollAreaScrollbarAuto = (props: ScrollAreaScrollbarAutoProps) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext();
  const [visible, setVisible] = useState(false);
  const isHorizontal = props.orientation === "horizontal";

  const handleResize = useDebouncedCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);

  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);

  if (forceMount || visible) {
    return (
      <ScrollAreaScrollbarVisible data-state={visible ? "visible" : "hidden"} {...scrollbarProps} />
    );
  }

  return null;
};
