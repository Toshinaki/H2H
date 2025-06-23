import { useTranslation } from "react-i18next";
import clsx from "clsx";
import ListSubheader from "@mui/material/ListSubheader";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import NavigationItem from "../NavigationItem";
import type { NavGroup, NavigationItemComponentProps } from "../../types";
import styles from "../StandardNavigation.module.css";

const NavGroupComponent = (props: NavigationItemComponentProps) => {
  const { t } = useTranslation("navigation");
  const { onItemClick, nestedLevel, showTooltip } = props;
  const item = props.item as NavGroup;

  // const icon = item.Icon ? <item.Icon className={styles.navitemIcon} /> : undefined;

  const label = t(`${item.id}.name`, { defaultValue: item.name || "" });
  const description = t(`${item.id}.description`, { defaultValue: item.description || "" });

  return (
    <>
      <Tooltip title={props.showTooltip && label} placement="right">
        <ListSubheader disableSticky className={clsx(styles.navitem, styles.navlistGroup)}>
          <Typography className={styles.navitemTitle}>{label}</Typography>
          {description && <Typography className={styles.navitemSubtitle}>{description}</Typography>}
        </ListSubheader>
      </Tooltip>

      {item.items.map((nav) => (
        <NavigationItem
          key={nav.id}
          item={nav}
          nestedLevel={nestedLevel}
          onItemClick={onItemClick}
          showTooltip={showTooltip}
        />
      ))}
    </>
  );
};

export default NavGroupComponent;
