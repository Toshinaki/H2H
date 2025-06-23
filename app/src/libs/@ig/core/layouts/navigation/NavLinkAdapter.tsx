import React, { type ComponentProps } from "react";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import Link, { type LinkProps } from "@mui/material/Link";

interface MUILinkProps extends LinkProps {}

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, MUILinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

const CreatedLinkComponent = createLink(MUILinkComponent);

const NavLinkAdapter: LinkComponent<typeof MUILinkComponent> = (props) => (
  <CreatedLinkComponent preload={"intent"} {...props} />
);

export default NavLinkAdapter;

export type NavLinkAdapterProps = ComponentProps<typeof NavLinkAdapter>;
