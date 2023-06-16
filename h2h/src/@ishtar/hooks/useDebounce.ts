import { useRef } from "react";
import _ from "@lodash";
import { DebounceSettings } from "lodash";

const useDebounce = (
  func: (...args: any) => any,
  wait: number,
  options?: DebounceSettings | undefined
) => {
  return useRef(_.debounce(func, wait, options)).current;
};

export default useDebounce;
