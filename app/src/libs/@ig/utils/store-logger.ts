import _ from "@lodash";
import dayjs from "dayjs";
import type { StateCreator, StoreMutatorIdentifier } from "zustand";
import type { StateSlice } from "store/types";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
  enabled?: boolean,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(f: StateSlice<T>, name?: string, enabled?: boolean) => StateSlice<T>;

const loggerImpl: LoggerImpl = (f, name, enabled) => (set, get, store) => {
  if (!enabled) {
    return f(set, get, store);
  }

  const loggedSet: typeof set = (...a) => {
    const start = new Date();
    const prev = get();
    set(...(a as Parameters<typeof set>));
    const delta = Date.now() - start.getTime();

    const actionType = a[2];
    console.groupCollapsed(
      // biome-ignore lint/style/useTemplate: <explanation>
      (name ? `%c[${name.toUpperCase()}] ` : "%c") +
        "%cACTION " +
        `%c${_.isString(actionType) ? actionType : actionType?.type || "anonymous"} ` +
        `%c@ ${formatLogTime(start)} (in ${delta} ms)`,
      "background: cyan; color: dimgray",
      "background: cyan; color: dimgray",
      "background: cyan; color: black; font-weight: 900",
      "background: cyan; color: dimgray",
    );
    console.log("%cprev state", "color: coral; font-weight: bold", prev);
    if (!_.isString(actionType)) {
      console.log(
        "%caction    ",
        "color: deepskyblue; font-weight: bold",
        _.omit(actionType, ["type"]),
      );
    }
    console.log("%cnext state", "color: mediumseagreen; font-weight:bold", get());
    console.groupEnd();
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

const formatLogTime = (date: Date) => dayjs(date).format("HH:mm:ss:SSS");
