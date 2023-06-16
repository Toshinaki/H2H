import { Tuple, DefaultMantineColor } from "@mantine/core";

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : "";

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type DeepKeyof<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | ValidKey<DeepKeyof<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

type Flatten<T, O = never> = Writable<Cleanup<T>, O> extends infer U
  ? U extends O
    ? U
    : U extends object
    ?
        | ValueOf<{ [K in keyof U]-?: (x: PrefixKeys<Flatten<U[K], O>, K, O>) => void }>
        | ((x: U) => void) extends (x: infer I) => void
      ? { [K in keyof I]: I[K] }
      : never
    : U
  : never;

type Writable<T, O> = T extends O
  ? T
  : {
      [P in keyof T as IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>]: T[P];
    };

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B;

type Cleanup<T> = 0 extends 1 & T
  ? unknown
  : T extends readonly any[]
  ? Exclude<keyof T, keyof any[]> extends never
    ? { [k: `${number}`]: T[number] }
    : Omit<T, keyof any[]>
  : T;

type PrefixKeys<V, K extends PropertyKey, O> = V extends O
  ? { [P in K]: V }
  : V extends object
  ? {
      [P in keyof V as `${Extract<K, string | number>}.${Extract<P, string | number>}`]: V[P];
    }
  : { [P in K]: V };

type ValueOf<T> = T[keyof T];

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type ExtendedColorType =
  | "primary"
  // | "secondary"
  // | "info"
  // | "warning"
  // | "error"
  // | "success"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedColorType, Tuple<string, 10>>;
  }

  // export interface MantineThemeOther {
  //   palette: {
  //     divider: string;
  //     background: { paper: string; default: string };
  //     text: { primary: string; secondary: string; disabled: string };
  //   };
  //   transitions: {
  //     duration: {
  //       shortest: string;
  //       shorter: string;
  //       short: string;
  //       standard: string;
  //       complex: string;
  //       enteringScreen: string;
  //       leavingScreen: string;
  //     };
  //     disabled?: boolean;
  //     easing: { easeInOut: string; easeOut: string; easeIn: string; sharp: string };
  //   };
  // }
}
