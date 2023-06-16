import __ from "lodash";

/**
 * You can extend Lodash with mixins
 * And use it as below
 * import _ from '@lodash'
 */
const _ = __.runInContext();

interface LoDashMixins extends _.LoDashStatic {
  setIn<T>(state: T, name: string, value: unknown): T;
  rsplit(str: string, sep: string, maxsplit?: number): Array<string>;
  deleteWith<T>(state: Array<T>, predicate: __.ListIteratee<T>): Array<T>;
}

_.mixin({
  // Immutable Set for setting state
  setIn: (state: object, name: string, value: unknown) => {
    return _.setWith(_.clone(state), name, value, _.clone);
  },
  rsplit: (str: string, sep: string, maxsplit?: number) => {
    const split = str.split(sep);
    return split.length > 1 && maxsplit
      ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit))
      : split;
  },
  deleteWith: function <T>(state: Array<T>, predicate: __.ListIteratee<T>) {
    const newState = _.clone(state);
    _.remove(newState, predicate);
    return newState;
  },
});

export default _ as LoDashMixins;
