import clsx from "clsx";
import List from "@mui/material/List";
import NavigationItem from "./NavigationItem";
import type { NavigationProps } from "../types";
import styles from "./StandardNavigation.module.css";

export const Navigation = (props: NavigationProps) => {
  const {
    navigations,
    onItemClick,
    showTooltip,
    itemProps,
    nestedLevel = 0,
    className,
    ...rest
  } = props;

  if (!navigations.length) return null;

  return (
    <List {...rest} className={clsx(styles.navigation, className)}>
      {navigations.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          onItemClick={onItemClick}
          nestedLevel={nestedLevel}
          showTooltip={showTooltip}
          itemProps={itemProps}
        />
      ))}
    </List>
  );
};
