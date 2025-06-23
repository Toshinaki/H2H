import { useEffect, useRef, useState } from "react";
import { useMergedRef } from "@ig/hooks";
import { useScrollAreaContext } from "../hooks";
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from "../utils";
import { Scrollbar } from "./Scrollbar";
import type { ScrollAreaScrollbarAxisProps } from "../types";

export const ScrollAreaScrollbarY = (props: ScrollAreaScrollbarAxisProps) => {
  const { ref, sizes, onSizesChange, style, ...rest } = props;
  const context = useScrollAreaContext();
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
  const defaultRef = useRef<HTMLDivElement>(null);
  const composeRefs = useMergedRef(ref, defaultRef, context.onScrollbarYChange);

  useEffect(() => {
    if (defaultRef.current) {
      setComputedStyle(window.getComputedStyle(defaultRef.current));
    }
  }, []);

  return (
    <Scrollbar
      ref={composeRefs}
      {...rest}
      data-orientation="vertical"
      sizes={sizes}
      onThumbPointerDown={(pointerPos) => props.onThumbPointerDown(pointerPos.y)}
      onDragScroll={(pointerPos) => props.onDragScroll(pointerPos.y)}
      onWheelScroll={(event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      }}
      onResize={() => {
        if (defaultRef.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: defaultRef.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom),
            },
          });
        }
      }}
      style={
        {
          ...style,
          "--sa-thumb-height": `${getThumbSize(sizes)}px`,
        } as React.CSSProperties
      }
    />
  );
};
