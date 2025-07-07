import { useEffect, useRef, useState } from "react";
import _ from "@lodash";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const isFixed = (current: number, fixedAt: number) => current <= fixedAt;
export const isPinned = (current: number, previous: number) => current <= previous;
export const isReleased = (current: number, previous: number, fixedAt: number) =>
  !isPinned(current, previous) && !isFixed(current, fixedAt);

export const isPinnedOrReleased = (
  current: number,
  fixedAt: number,
  isCurrentlyPinnedRef: React.RefObject<boolean>,
  isScrollingUp: boolean,
  onPin?: () => void,
  onRelease?: () => void,
) => {
  const isInFixedPosition = isFixed(current, fixedAt);
  if (isInFixedPosition && !isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = true;
    onPin?.();
  } else if (!isInFixedPosition && isScrollingUp && !isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = true;
    onPin?.();
  } else if (!isInFixedPosition && isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = false;
    onRelease?.();
  }
};

export const useScrollDirection = (ele?: Element | null) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let resizeTimer: number | undefined;

    const onResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setIsResizing(false);
      }, 300); // Reset the resizing flag after a timeout
    };

    const onScroll = _.throttle(() => {
      if (isResizing) {
        return; // Skip scroll events if resizing is in progress
      }
      const currentScrollTop =
        ele?.scrollTop || window.scrollY || document.documentElement.scrollTop;
      setIsScrollingUp(currentScrollTop < lastScrollTop);
      setLastScrollTop(currentScrollTop);
    }, 250);

    (ele || window).addEventListener("scroll", onScroll);
    (ele || window).addEventListener("resize", onResize);

    return () => {
      (ele || window).removeEventListener("scroll", onScroll);
      (ele || window).removeEventListener("resize", onResize);
    };
  }, [lastScrollTop, isResizing, ele]);

  return isScrollingUp;
};

interface UseHeaderPinnedInput {
  /** Number in px at which element should be fixed */
  fixedAt?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;

  scrollRef?: React.RefObject<Element | null>;
}

export const useHeaderPinned = ({
  fixedAt = 0,
  onPin,
  onFix,
  onRelease,
  scrollRef,
}: UseHeaderPinnedInput = {}) => {
  const isCurrentlyPinnedRef = useRef(false);
  const isScrollingUp = useScrollDirection(scrollRef?.current);
  const scrollPosition = scrollRef?.current?.scrollTop || 0;

  useIsomorphicLayoutEffect(() => {
    isPinnedOrReleased(
      scrollPosition,
      fixedAt,
      isCurrentlyPinnedRef,
      isScrollingUp,
      onPin,
      onRelease,
    );
  }, [scrollPosition]);

  useIsomorphicLayoutEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix?.();
    }
  }, [scrollPosition, fixedAt, onFix]);

  return [isFixed(scrollPosition, fixedAt), isScrollingUp];
};
