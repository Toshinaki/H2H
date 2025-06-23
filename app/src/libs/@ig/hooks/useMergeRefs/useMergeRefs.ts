import * as React from "react";

/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 * @see https://floating-ui.com/docs/react-utils#usemergerefs
 */
export function useMergeRefs<Instance>(
  refs: Array<React.Ref<Instance> | undefined>,
): null | React.RefCallback<Instance> {
  const cleanupRef = React.useRef<void | (() => void)>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const refEffect = React.useCallback((instance: Instance | null) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return;
      }

      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup: void | (() => void) = refCallback(instance);
        return typeof refCleanup === "function"
          ? refCleanup
          : () => {
              refCallback(null);
            };
      }

      (ref as React.MutableRefObject<Instance | null>).current = instance;
      return () => {
        (ref as React.MutableRefObject<Instance | null>).current = null;
      };
    });

    return () => {
      for (const refCleanup of cleanups) {
        refCleanup?.();
      }
    };
  }, refs);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        (cleanupRef as React.MutableRefObject<void | (() => void)>).current = undefined;
      }

      if (value != null) {
        (cleanupRef as React.MutableRefObject<void | (() => void)>).current = refEffect(value);
      }
    };
  }, refs);
}
