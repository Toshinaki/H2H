import { useEffect, useRef, useState } from "react";
import { useMergedRef } from "@ig/hooks";
import { useScrollAreaContext } from "../hooks";
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from "../utils";
import { Scrollbar } from "./Scrollbar";
import type { ScrollAreaScrollbarAxisProps } from "../types";

export const ScrollAreaScrollbarX = (props: ScrollAreaScrollbarAxisProps) => {
  const { ref, sizes, onSizesChange, style, ...others } = props;
  const ctx = useScrollAreaContext();
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
  const defaultRef = useRef<HTMLDivElement>(null);
  const composeRefs = useMergedRef(ref, defaultRef, ctx.onScrollbarXChange);

  useEffect(() => {
    if (defaultRef.current) {
      setComputedStyle(getComputedStyle(defaultRef.current));
    }
  }, []);

  return (
    <Scrollbar
      data-orientation="horizontal"
      {...others}
      ref={composeRefs}
      sizes={sizes}
      style={
        {
          ...style,
          "--sa-thumb-width": `${getThumbSize(sizes)}px`,
        } as React.CSSProperties
      }
      onThumbPointerDown={(pointerPos) => props.onThumbPointerDown(pointerPos.x)}
      onDragScroll={(pointerPos) => props.onDragScroll(pointerPos.x)}
      onWheelScroll={(event, maxScrollPos) => {
        if (ctx.viewport) {
          const scrollPos = ctx.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      }}
      onResize={() => {
        if (defaultRef.current && ctx.viewport && computedStyle) {
          onSizesChange({
            content: ctx.viewport.scrollWidth,
            viewport: ctx.viewport.offsetWidth,
            scrollbar: {
              size: defaultRef.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight),
            },
          });
        }
      }}
    />
  );
};
