import type { BoxProps } from "@mui/material/Box";
import type { AnyNavItem, NavigationProps } from "../navigation/types";

export interface NavbarProps extends BoxProps, Pick<NavigationProps, "itemProps"> {
  navigations: Array<AnyNavItem>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
