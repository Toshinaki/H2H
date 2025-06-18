import { useEffect, useState } from "react";
import { useAppStore } from "store";
// TODO
// import { openErrorModal } from "@ig/core/error-handling";
import logger from "@ig/utils/logger";
import type { InitAction } from "store/core/types";

export interface BasicCheckerProps {
  action: string;
  ignorable?: boolean;
  checkFn: () => Promise<boolean>;
  onSuccess?: () => Promise<unknown>;
  depends?: Array<string>;
  onBeforeRetry?: (retries: number) => Promise<unknown>;
  retryOnFail?: boolean;
  maxTrial?: number;
  onFail?: (retries: number) => Promise<unknown>;
}

const BasicChecker = ({
  action,
  checkFn,
  ignorable,
  onSuccess,
  depends = [],
  onBeforeRetry,
  retryOnFail = false,
  maxTrial = 10,
  onFail,
}: BasicCheckerProps) => {
  const [setAction, checkerAction, isReady] = useAppStore((state) => [
    state.init.setAction,
    state.init[action] as InitAction | undefined,
    depends.map((d) => !!(state.init[d] as InitAction | undefined)?.success).every(Boolean),
  ]);

  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (isReady && !checkerAction?.type) {
      setAction(action, { type: "checker" });
    }
  }, [action, checkerAction?.type, isReady, setAction]);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (checkerAction?.type && checkerAction?.state !== "done") {
      setAction(action, { state: "inProgress" });

      const retry = async () => {
        try {
          if (await checkFn()) {
            await onSuccess?.();
            setAction(action, { state: "done", success: true });
          } else if (retryOnFail && attemptCount < maxTrial) {
            await onBeforeRetry?.(attemptCount);
            setAttemptCount((prev) => prev + 1);
            timeoutId = window.setTimeout(retry, 100 * 2 ** attemptCount);
          } else {
            if (ignorable) {
              await onSuccess?.();
            } else {
              await onFail?.(attemptCount);
            }
            setAction(action, {
              state: "done",
              success: false,
              ignored: ignorable,
            });
          }
        } catch (error) {
          logger.warn(error);
          if (ignorable) {
            // openErrorModal("criticalError", error as Error);
            // TODO open a warning modal, if it's ignorable
            if (ignorable) {
              await onSuccess?.();
            } else {
              await onFail?.(attemptCount);
            }
            setAction(action, {
              state: "done",
              success: false,
              ignored: ignorable,
            });
          } else {
            // openErrorModal("critical", error as Error);
          }
        }
      };

      retry();

      return () => {
        clearTimeout(timeoutId); // Cleanup to prevent memory leaks
      };
    }
  }, [
    action,
    attemptCount,
    checkFn,
    checkerAction?.state,
    checkerAction?.type,
    ignorable,
    maxTrial,
    onBeforeRetry,
    onFail,
    onSuccess,
    retryOnFail,
    setAction,
  ]);

  return null;
};

export default BasicChecker;
