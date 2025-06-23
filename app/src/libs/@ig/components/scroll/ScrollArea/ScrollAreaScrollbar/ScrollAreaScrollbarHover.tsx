import { useEffect, useState } from "react";
import { useScrollAreaContext } from "../hooks";
import {
  ScrollAreaScrollbarAuto,
  type ScrollAreaScrollbarAutoProps,
} from "./ScrollAreaScrollbarAuto";

interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: true;
}

export const ScrollAreaScrollbarHover = (props: ScrollAreaScrollbarHoverProps) => {
  const { forceMount, ...rest } = props;
  const context = useScrollAreaContext();
  const [visible, setVisible] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const { scrollArea } = context;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    return undefined;
  }, [context.scrollArea, context.scrollHideDelay]);

  if (forceMount || visible) {
    return <ScrollAreaScrollbarAuto data-state={visible ? "visible" : "hidden"} {...rest} />;
  }

  return null;
};
