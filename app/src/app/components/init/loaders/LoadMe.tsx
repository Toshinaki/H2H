import { useAppStore } from "store";
import _ from "@lodash";
import BasicLoader from "@ig/core/Initializer/BasicLoader";
import { ANONYMOUS_USER } from "configs/app.config";
import type { Me } from "common/types";

export const action = "load-me";

const LoadMe = () => {
  const setUser = useAppStore((state) => state.auth.setUser);

  const handleLoadMe = (me: Me) => {
    console.log({ me });
    if (!_.isEmpty(me)) {
      setUser(me);
    }
  };

  return (
    <BasicLoader
      action={action}
      loadFn={() => new Promise<Me>((resolve) => resolve(ANONYMOUS_USER))}
      onSuccess={handleLoadMe}
    />
  );
};

export default LoadMe;
