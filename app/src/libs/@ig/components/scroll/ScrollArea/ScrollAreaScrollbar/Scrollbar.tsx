import { useEffect, useRef, useState } from "react";
import { useScrollAreaContext } from "../hooks";
import { ScrollbarContext, type ScrollbarContextValue } from "./Scrollbar.context";
import { useCallbackRef, useDebouncedCallback, useMergedRef } from "@ig/hooks";
import { useResizeObserver } from "../use-resize-observer";
import { composeEventHandlers } from "../utils";
import type { Sizes } from "../types";
import styles from "../ScrollArea.module.css";

export interface ScrollbarPrivateProps {
  sizes: Sizes;
  hasThumb: boolean;
  onThumbChange: ScrollbarContextValue["onThumbChange"];
  onThumbPointerUp: ScrollbarContextValue["onThumbPointerUp"];
  onThumbPointerDown: ScrollbarContextValue["onThumbPointerDown"];
  onThumbPositionChange: ScrollbarContextValue["onThumbPositionChange"];
  onWheelScroll: (event: WheelEvent, maxScrollPos: number) => void;
  onDragScroll: (pointerPos: { x: number; y: number }) => void;
  onResize: () => void;
}

interface ScrollbarProps
  extends ScrollbarPrivateProps,
    Omit<React.ComponentPropsWithoutRef<"div">, "onResize"> {
  ref?: React.Ref<HTMLDivElement>;
}

export const Scrollbar = (props: ScrollbarProps) => {
  const {
    ref,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext();
  const [scrollbar, setScrollbar] = useState<HTMLDivElement | null>(null);
  const composeRefs = useMergedRef(ref, (node) => setScrollbar(node));
  const rectRef = useRef<DOMRect | null>(null);
  const prevWebkitUserSelectRef = useRef<string>("");
  const { viewport } = context;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebouncedCallback(onResize, 10);

  const handleDragScroll = (event: React.PointerEvent<HTMLElement>) => {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const element = event.target as HTMLElement;
      const isScrollbarWheel = scrollbar?.contains(element);
      if (isScrollbarWheel) {
        handleWheelScroll(event, maxScrollPos);
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return () => document.removeEventListener("wheel", handleWheel, { passive: false } as any);
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);

  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);

  return (
    <ScrollbarContext.Provider
      value={{
        scrollbar,
        hasThumb,
        onThumbChange: useCallbackRef(onThumbChange),
        onThumbPointerUp: useCallbackRef(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      }}
    >
      <div
        {...scrollbarProps}
        ref={composeRefs}
        data-scrollbar
        onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
          event.preventDefault();

          const mainPointer = 0;
          if (event.button === mainPointer) {
            const element = event.target as HTMLElement;
            element.setPointerCapture(event.pointerId);
            rectRef.current = scrollbar?.getBoundingClientRect() || null;
            prevWebkitUserSelectRef.current = document.body.style.userSelect;
            document.body.style.userSelect = "none";
            handleDragScroll(event);
          }
        })}
        onPointerMove={composeEventHandlers(props.onPointerMove, handleDragScroll)}
        onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
          const element = event.target as HTMLElement;
          if (element.hasPointerCapture(event.pointerId)) {
            event.preventDefault();
            element.releasePointerCapture(event.pointerId);
          }
        })}
        onLostPointerCapture={() => {
          document.body.style.userSelect = prevWebkitUserSelectRef.current;
          rectRef.current = null;
        }}
        className={styles.scrollbar}
        style={{ position: "absolute", ...scrollbarProps.style }}
      />
    </ScrollbarContext.Provider>
  );
};
