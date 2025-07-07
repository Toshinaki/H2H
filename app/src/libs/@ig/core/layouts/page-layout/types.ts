import type { ScrollAreaProps } from "@ig/components/scroll/ScrollArea";
import type { Breakpoint } from "@ig/configs";
import type { BoxProps, DrawerProps, IconButtonProps, SvgIcon } from "@mui/material";

// sidebar

export interface PageLayoutSidebarType
  extends Partial<
    Omit<DrawerProps, "content" | "position" | "scrollAreaComponent" | "lockScroll" | "children">
  > {
  content: React.ReactNode;
  breakpoint?: Breakpoint;
  withBorder?: boolean;
  withCloseButton?: boolean;
  customScroll?: boolean;
  onClose?: () => void;
}

export interface PageLayoutSidebarProps extends PageLayoutSidebarType {
  position: "left" | "right";
}

// header

export interface PageLayoutHeaderProps {
  content: React.ReactNode;
  withToggleButton?: {
    left?: boolean;
    right?: boolean;
  };
  leftToggleIcon?: { open?: typeof SvgIcon; close?: typeof SvgIcon };
  rightToggleIcon?: { open?: typeof SvgIcon; close?: typeof SvgIcon };
  buttonProps?: Omit<IconButtonProps, "onClick">;
  className?: string;
}

// content

export interface PageLayoutContentProps extends Omit<ScrollAreaProps, "onScrollPositionChange"> {
  scrollOffset?: number;
  scroll?: "page" | "content" | "unset";
}

// main

export interface PageLayoutProps
  extends BoxProps,
    Pick<PageLayoutContentProps, "scroll" | "scrollOffset"> {
  header?: PageLayoutHeaderProps;
  leftSidebar?: PageLayoutSidebarType;
  rightSidebar?: PageLayoutSidebarType;
  breakpoint?: Breakpoint;
  withScrollButton?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
  classNames?: {
    root?: string;
    container?: string;
    wrapper?: string;
    contentWrapper?: string;
    header?: string;
    content?: string;
    sidebar?: string;
    leftSidebar?: string;
    rightSidebar?: string;
  };
}
