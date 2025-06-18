import { useAppStore } from "store";
import { useShallow } from "zustand/react/shallow";
import { useShallowEffect } from "@ig/hooks/useShallowEffect";
import type { InitAction } from "store/core/types";

export interface InitializerProps {
  loaders: Record<string, () => React.JSX.Element>;
  checkers: Record<string, () => React.JSX.Element>;
  loaderActions: Array<string>;
  checkerActions: Array<string>;
}

const Initializer = ({ loaders, checkers, loaderActions, checkerActions }: InitializerProps) => {
  const { status, setStatus, setSuccess, setActions, actions, ...init } = useAppStore(
    useShallow((state) => state.init),
  );
  const initActions = actions.map(
    (action) => init[action] as Omit<InitAction, "action" | "enabled"> | undefined,
  );

  useShallowEffect(() => {
    if (!status) {
      setActions([...loaderActions, ...checkerActions]);
      setStatus("initializing");
    }
  }, [checkerActions, loaderActions, setActions, setStatus, status]);

  useShallowEffect(() => {
    if (status === "initializing") {
      if (initActions.length > 0) {
        const allDone = initActions.every((action) => action?.state === "done");
        if (allDone) {
          setStatus("initialized");
          setSuccess(initActions.every((action) => action?.success || action?.ignored));
        }
      } else {
        setStatus("initialized");
        setSuccess(true);
      }
    }
  }, [initActions, setStatus, setSuccess, status]);

  return (
    status === "initializing" && (
      <>
        {loaderActions
          .filter((action): action is keyof typeof loaders => action in loaders)
          .map((action) => {
            const Comp = loaders[action];
            return <Comp key={action} />;
          })}

        {checkerActions
          .filter((action): action is keyof typeof checkers => action in checkers)
          .map((action) => {
            const Comp = checkers[action];
            return <Comp key={action} />;
          })}
      </>
    )
  );
};

export default Initializer;
