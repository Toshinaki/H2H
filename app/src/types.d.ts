type PartialExcept<Object, Keys extends keyof Object> = Partial<Object> & {
  [Key in Keys]: Required<Pick<Object, Key>>[Key];
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type ExtractUnion<T, C> = T extends C ? T : never;
