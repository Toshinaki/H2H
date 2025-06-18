import { useAppStore } from "store";
// import { openErrorModal } from "@ig/core/error-handling";
import logger from "@ig/utils/logger";
import type { InitAction } from "store/core/types";
import { useEffect } from "react";

export interface BasicLoaderProps<T> {
  action: string;
  ignorable?: boolean;
  loadFn: () => Promise<T>;
  onSuccess?: (data: T) => void;
  depends?: Array<string>;
}

const BasicLoader = <T,>({
  action,
  loadFn,
  ignorable,
  onSuccess,
  depends,
}: BasicLoaderProps<T>) => {
  const [setAction, loaderAction, isReady] = useAppStore((state) => [
    state.init.setAction,
    state.init[action] as InitAction | undefined,
    (depends || []).map((d) => !!(state.init[d] as InitAction | undefined)?.success).every(Boolean),
  ]);

  useEffect(() => {
    if (isReady && !loaderAction) {
      setAction(action, { type: "loader" });
    }
  }, [action, isReady, loaderAction, setAction]);

  useEffect(() => {
    if (loaderAction?.type && loaderAction.state !== "done") {
      setAction(action, { state: "inProgress" });

      loadFn()
        .then((result) => {
          onSuccess?.(result);
          setAction(action, { state: "done", success: true });
        })
        .catch((error: Error) => {
          logger.warn(error);
          if (ignorable) {
            // openErrorModal("critical", error);
          } else {
            // openErrorModal("critical", error);
          }
          setAction(action, {
            state: "done",
            success: false,
            ignored: !!ignorable,
          });
        });
    }
  }, [action, ignorable, loadFn, loaderAction?.state, loaderAction?.type, onSuccess, setAction]);

  return null;
};

export default BasicLoader;
