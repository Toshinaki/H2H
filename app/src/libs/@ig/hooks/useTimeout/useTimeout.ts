import { useCallback, useEffect, useRef } from "react";

// Options that can be passed to the hook
export interface UseTimeoutOptions {
  autoInvoke: boolean; // If true, start the timeout automatically on mount
}

// Returned functions from the hook
export interface UseTimeoutReturnValue {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  start: (...args: any[]) => void; // Starts the timeout
  clear: () => void; // Clears the timeout if it's active
}

/**
 * Custom hook for setting a timeout with optional auto-invoke.
 *
 * @param callback - The function to be executed after the delay
 * @param delay - Timeout delay in milliseconds
 * @param options - Optional configuration; currently supports `autoInvoke`
 *
 * @returns An object with `start` and `clear` functions
 */
export function useTimeout(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  callback: (...args: any[]) => void,
  delay: number,
  options: UseTimeoutOptions = { autoInvoke: false },
): UseTimeoutReturnValue {
  // Ref to store the current timeout ID
  const timeoutRef = useRef<number | null>(null);

  // Starts the timeout if one isn't already set
  const start = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (...args: any[]) => {
      if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          callback(args); // Note: args are passed as a single array
          timeoutRef.current = null; // Reset the ref after execution
        }, delay);
      }
    },
    [delay, callback], // Recreate if delay or callback changes
  );

  // Clears the existing timeout if one is set
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Automatically start the timeout on mount if autoInvoke is true
  useEffect(() => {
    if (options.autoInvoke) {
      start();
    }

    // Cleanup function to clear timeout on unmount or dependency change
    return clear;
  }, [clear, start, options.autoInvoke]);

  return { start, clear };
}
