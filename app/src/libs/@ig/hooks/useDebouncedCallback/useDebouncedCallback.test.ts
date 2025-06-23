import { renderHook } from "@testing-library/react";
import { useDebouncedCallback } from "./useDebouncedCallback";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("@ig/hooks/use-debounced-callback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("debounces callback with given delay", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current();
    result.current();
    result.current();
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalled();
  });

  it("calls callback with correct arguments", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current(2);
    result.current(3);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("can be flushed immediately", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current(2);
    result.current(3);
    result.current.flush();
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("can be flushed immediately after rerender", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    rerender();
    result.current.flush();
    expect(callback).toHaveBeenCalledWith(1);
  });

  it("doesnt flush twice", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current.flush();
    expect(callback).toHaveBeenCalledWith(1);
    callback.mockClear();
    rerender();
    result.current.flush();
    expect(callback).not.toHaveBeenCalled();
  });

  it("doesnt flush after being called if not called since", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith(1);
    callback.mockClear();
    result.current.flush();
    expect(callback).not.toHaveBeenCalled();
  });

  it("doesnt still call after flush if not called since", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current.flush();
    expect(callback).toHaveBeenCalledWith(1);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("can flush on unmount", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true }),
    );
    result.current(1);
    result.current(2);
    result.current(3);
    unmount();
    expect(callback).toHaveBeenCalledWith(3);
  });

  // Note: this might not be desired but this is what happens
  it("flushes on option changes", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(({ delay }: { delay: number } = { delay: 100 }) =>
      useDebouncedCallback(callback, { flushOnUnmount: true, delay }),
    );
    result.current(1);
    rerender({ delay: 200 });
    expect(callback).toHaveBeenCalledWith(1);
  });

  // Note: this might not be desired but this is what happens
  it("cancels on option changes", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(({ delay }: { delay: number } = { delay: 100 }) =>
      useDebouncedCallback(callback, { flushOnUnmount: false, delay }),
    );
    result.current(1);
    rerender({ delay: 200 });
    vi.advanceTimersByTime(200);
    expect(callback).not.toHaveBeenCalled();
  });

  it("can flush on unmount after rerender", () => {
    const callback = vi.fn();
    const { result, unmount, rerender } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true }),
    );
    result.current(1);
    result.current(2);
    result.current(3);
    rerender();
    unmount();
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("does not call after unmount if timer lapsed", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: false }),
    );
    result.current(1);
    unmount();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not call on unmount if never called", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true }),
    );
    unmount();
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not call on unmount if already called and not called since", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true }),
    );
    result.current(1);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalled();
    callback.mockClear();
    unmount();
    expect(callback).not.toHaveBeenCalled();
  });

  it("debounces callback with leading=true", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true }),
    );
    result.current(1);
    expect(callback).toHaveBeenCalledWith(1);

    callback.mockClear();
    result.current(2);
    result.current(3);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("resets leading after flush", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true }),
    );

    // The first call fires immediately
    result.current("a");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");

    // A second call is made. Since "leadingRef" is now false, this call is debounced and schedules a timeout.
    result.current("b");
    // The callback has still only been called once (with 'a').
    expect(callback).toHaveBeenCalledTimes(1);

    // Then we advance the timers to trigger the internal flush of the first call, executing "b"
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(2, "b");

    // After the flush from "b", "leadingRef" resets, so the next call fires immediately again
    result.current("c");
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith("c");
  });

  it("doesnt call on leading edge if leading changes from true to false", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ leading }: { leading?: boolean } = { leading: true }) =>
        useDebouncedCallback(callback, { delay: 100, leading }),
    );
    rerender({ leading: false });
    result.current(1);
    result.current(2);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does call again on leading edge if options change and it was already called before the change", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(({ delay }: { delay: number } = { delay: 100 }) =>
      useDebouncedCallback(callback, { delay, leading: true }),
    );
    result.current(1);
    expect(callback).toHaveBeenCalledTimes(1);
    rerender({ delay: 200 });
    result.current(2);
    result.current(3);
    expect(callback).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("can cancel debounced callback", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current(2);
    result.current(3);
    result.current.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it("can cancel after second render", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    rerender();
    result.current.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it("can cancel multiple times without error", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current.cancel();
    result.current.cancel();
    result.current.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it("can cancel and then call again", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current.cancel();
    result.current(2);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });

  it("cancel does not affect already executed callback", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith(1);
    result.current.cancel();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancel resets leading flag for leading=true", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true }),
    );

    // First call fires immediately
    result.current("a");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");

    // Second call is debounced
    result.current("b");
    expect(callback).toHaveBeenCalledTimes(1);

    // Cancel the debounced call
    result.current.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);

    // Next call should fire immediately again since cancel reset the leading flag
    result.current("c");
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith("c");
  });

  it("cancel prevents flush from working after cancel", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current.cancel();
    result.current.flush();
    expect(callback).not.toHaveBeenCalled();
  });

  it("flush works after cancel if new call is made", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    result.current(1);
    result.current.cancel();
    result.current(2);
    result.current.flush();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });
});
