import { useEffect } from "react";
import { useScrollAreaContext } from "../hooks";
import { ScrollAreaScrollbarAuto } from "./ScrollAreaScrollbarAuto";
import { ScrollAreaScrollbarHover } from "./ScrollAreaScrollbarHover";
import { ScrollAreaScrollbarScroll } from "./ScrollAreaScrollbarScroll";
import {
  ScrollAreaScrollbarVisible,
  type ScrollAreaScrollbarVisibleProps,
} from "./ScrollAreaScrollbarVisible";

interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export const ScrollAreaScrollbar = (props: ScrollAreaScrollbarProps) => {
  const { ref, forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext();
  const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
  const isHorizontal = props.orientation === "horizontal";

  useEffect(() => {
    isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
    return () => {
      isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
    };
  }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);

  return context.type === "hover" ? (
    <ScrollAreaScrollbarHover {...scrollbarProps} ref={ref} forceMount={forceMount} />
  ) : context.type === "scroll" ? (
    <ScrollAreaScrollbarScroll {...scrollbarProps} ref={ref} forceMount={forceMount} />
  ) : context.type === "auto" ? (
    <ScrollAreaScrollbarAuto {...scrollbarProps} ref={ref} forceMount={forceMount} />
  ) : context.type === "always" ? (
    <ScrollAreaScrollbarVisible {...scrollbarProps} ref={ref} />
  ) : null;
};
