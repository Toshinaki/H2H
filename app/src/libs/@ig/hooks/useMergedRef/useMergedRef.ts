import { useCallback, type Ref, type RefCallback } from "react";

type PossibleRef<T> = Ref<T> | undefined;

type RefCleanup<T> = ReturnType<RefCallback<T>>;

export function assignRef<T>(ref: PossibleRef<T>, value: T): RefCleanup<T> {
  if (typeof ref === "function") {
    return ref(value);
  }
  if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  const cleanupMap = new Map<PossibleRef<T>, Exclude<RefCleanup<T>, void>>();

  return (node: T | null) => {
    for (const ref of refs) {
      const cleanup = assignRef(ref, node);
      if (cleanup) {
        cleanupMap.set(ref, cleanup);
      }
    }

    if (cleanupMap.size > 0) {
      return () => {
        for (const ref of refs) {
          const cleanup = cleanupMap.get(ref);
          if (cleanup) {
            cleanup();
          } else {
            assignRef(ref, null);
          }
        }
        cleanupMap.clear();
      };
    }
  };
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  return useCallback(mergeRefs(...refs), refs);
}
