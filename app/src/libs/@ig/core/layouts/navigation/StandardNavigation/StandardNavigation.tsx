import Divider from "@mui/material/Divider";

import { Navigation } from "./Navigation";
import type { NavigationProps } from "../types";

import { registerComponent } from "../utils";
import NavCollapseComponent from "./items/NavCollapseComponent";
import NavGroupComponent from "./items/NavGroupComponent";
import NavItemComponent from "./items/NavItemComponent";
import NavLinkComponent from "./items/NavLinkComponent";

// console.log("StandardNavigation");

registerComponent("standard-group", NavGroupComponent);
registerComponent("standard-collapse", NavCollapseComponent);
registerComponent("standard-link", NavLinkComponent);
registerComponent("standard-item", NavItemComponent);
registerComponent("divider", () => <Divider component="li" />);

const StandardNavigation = (props: NavigationProps) => {
  const { navigations, ...rest } = props;

  return navigations.length > 0 && <Navigation navigations={navigations} {...rest} />;
};

export default StandardNavigation;
