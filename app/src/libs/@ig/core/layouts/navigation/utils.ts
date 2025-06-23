import type { NavConfig, NavDivider } from "./types";

type ComponentName =
  | `${"standard" | "foldable" | "tabbed"}-${NavConfig["type"]}`
  | NavDivider["type"];

export const components: Partial<Record<ComponentName, React.FC<unknown>>> = {};

export function registerComponent<T = unknown>(name: ComponentName, Component: React.FC<T>) {
  components[name] = Component as React.FC<unknown>;
}
