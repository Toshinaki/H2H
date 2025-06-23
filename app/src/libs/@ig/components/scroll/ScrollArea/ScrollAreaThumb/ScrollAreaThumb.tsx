import { useEffect, useRef } from "react";
import { useScrollAreaContext } from "../hooks";
import { useScrollbarContext } from "../ScrollAreaScrollbar/hooks";
import { useDebouncedCallback, useMergedRef } from "@ig/hooks";
import { addUnlinkedScrollListener, composeEventHandlers } from "../utils";
import styles from "../ScrollArea.module.css";

interface ThumbProps extends React.ComponentPropsWithoutRef<"div"> {
  ref?: React.RefObject<HTMLDivElement>;
}

export const Thumb = ({ ref, ...props }: ThumbProps) => {
  const { style, ...others } = props;
  const scrollAreaContext = useScrollAreaContext();
  const scrollbarContext = useScrollbarContext();
  const { onThumbPositionChange } = scrollbarContext;
  const composedRef = useMergedRef(ref, (node) => scrollbarContext.onThumbChange(node));
  const removeUnlinkedScrollListenerRef = useRef<(() => void) | undefined>(undefined);
  const debounceScrollEnd = useDebouncedCallback(() => {
    if (removeUnlinkedScrollListenerRef.current) {
      removeUnlinkedScrollListenerRef.current();
      removeUnlinkedScrollListenerRef.current = undefined;
    }
  }, 100);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const { viewport } = scrollAreaContext;
    if (viewport) {
      const handleScroll = () => {
        debounceScrollEnd();
        if (!removeUnlinkedScrollListenerRef.current) {
          const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          removeUnlinkedScrollListenerRef.current = listener;
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }

    return undefined;
  }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);

  return (
    <div
      data-state={scrollbarContext.hasThumb ? "visible" : "hidden"}
      {...others}
      ref={composedRef}
      onPointerDownCapture={composeEventHandlers(props.onPointerDownCapture, (event) => {
        const thumb = event.target as HTMLElement;
        const thumbRect = thumb.getBoundingClientRect();
        const x = event.clientX - thumbRect.left;
        const y = event.clientY - thumbRect.top;
        scrollbarContext.onThumbPointerDown({ x, y });
      })}
      onPointerUp={composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)}
      className={styles.thumb}
      style={{
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...style,
      }}
    />
  );
};

interface ScrollAreaThumbProps extends ThumbProps {
  forceMount?: true;
}

export const ScrollAreaThumb = ({ ref, ...props }: ScrollAreaThumbProps) => {
  const { forceMount, ...thumbProps } = props;
  const scrollbarContext = useScrollbarContext();

  if (forceMount || scrollbarContext.hasThumb) {
    return <Thumb ref={ref} {...thumbProps} />;
  }

  return null;
};
