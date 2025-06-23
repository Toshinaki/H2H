import type { ListProps } from "@mui/material/List";
import type { TooltipProps } from "@mui/material/Tooltip";
import type { OverrideProperties } from "type-fest";
import type { NavLinkAdapterProps } from "./NavLinkAdapter";

export interface NavBadge {
  title: React.ReactNode;
  bg: string;
  fg: string;
}

type BaseNavItem = {
  id: string;
  type: "item" | "group" | "collapse" | "link" | "action";
  name: string;
  description?: string;
  Icon?: React.ElementType;
  iconClass?: string;
  // auth?: Array<string>;
  badge?: NavBadge;
  exact?: boolean;
  disabled?: boolean;
  position?: "start" | "center" | "end";
};

// TODO string -> route id
export type NavItem = Override<BaseNavItem, { id: string; type: "item"; path: string }>;
export type NavLink = Override<BaseNavItem, { type: "link"; path?: string }>;
// export type NavAction  = Override<
//   BaseNavItem ,
//   { type: "action"; onClick: (e: MouseEvent) => void }
// >;
export type NavGroup = Override<
  BaseNavItem,
  {
    type: "group";
    items: Array<NavItem | NavLink | NavCollapse | NavDivider>;
  }
>;
export type NavCollapse = Override<
  BaseNavItem,
  {
    type: "collapse";
    items: Array<NavItem | NavLink | NavCollapse | NavDivider>;
  }
>;

export type NavDivider = {
  id: string;
  type: "divider";
};

export type NavConfig = NavItem | NavLink | NavGroup | NavCollapse;

export type AnyNavItem = NavConfig | NavDivider;

/**
 * props
 */

export type NavigationProps = React.ComponentProps<"ul"> &
  ListProps & {
    // dense?: boolean;
    // active?: boolean;
    navigations: Array<AnyNavItem>;
    onItemClick?: (item: NavConfig, event: React.MouseEvent<HTMLLIElement>) => void;
    // firstLevel?: boolean;
    nestedLevel?: number;
    showTooltip?: boolean;
    selectedId?: string;
    itemProps?: Partial<NavLinkAdapterProps>;
    ref?: React.RefObject<HTMLUListElement>;
  };

export interface NavigationItemProps extends React.ComponentProps<"li"> {
  item: AnyNavItem;
  itemProps?: Partial<NavLinkAdapterProps>;
  onItemClick?: (item: NavConfig, event: React.MouseEvent<HTMLLIElement>) => void;
  nestedLevel?: number;
  // dense?: boolean;
  showTooltip?: boolean;
  selectedId?: string;
  tooltipProps?: Omit<TooltipProps, "children" | "title">;
}

export type NavigationItemComponentProps = OverrideProperties<
  NavigationItemProps,
  { item: NavConfig }
>;
