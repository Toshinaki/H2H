import { components } from "../utils";
import type { NavigationItemProps } from "../types";

const NavigationItem = ({ item, ...props }: NavigationItemProps) => {
  const Comp = item.type === "divider" ? components.divider : components[`standard-${item.type}`];

  return Comp ? <Comp {...({ item, ...props } as object)} /> : null;
};

export default NavigationItem;
