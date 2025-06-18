/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

declare module "lodash" {
  interface LoDashStatic {
    /**
     * A function that sets a value at a given path in an object.
     */
    setIn: (state: unknown, name: string, value: unknown) => unknown;
  }
  interface LoDashExplicitWrapper<TValue> {
    /**
     * A function that sets a value at a given path in an object.
     */
    setIn: (name: string, value: unknown) => LoDashExplicitWrapper<TValue>;
  }
}

_.mixin({
  /**
   * A function that sets a value at a given path in an object.
   */
  setIn: (state, name, value) =>
    _.setWith(_.clone(state), name, value, _.clone),
});

export default _;
