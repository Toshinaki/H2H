import { useTranslation } from "react-i18next";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import type { NavigationItemComponentProps, NavLink } from "../../types";
import styles from "../StandardNavigation.module.css";
import ListItem from "@mui/material/ListItem";

const NavLinkComponent = (props: NavigationItemComponentProps) => {
  const { t } = useTranslation("navigation");
  const item = props.item as NavLink & { path: string };

  const icon = item.Icon ? <item.Icon className={styles.navitemIcon} /> : undefined;

  const label = t(`${item.id}.name`, { defaultValue: item.name || "" });

  const { nestedLevel = 0 } = props;
  const itemPadding = nestedLevel > 0 ? 2.8 + nestedLevel : 1.2;

  return (
    <Tooltip title={props.showTooltip && label} placement="right">
      <ListItem onClick={(e) => props.onItemClick?.(item, e)} className={styles.navitem}>
        <ListItemButton
          href={item.path}
          target="_blank"
          disabled={item.disabled}
          className={styles.navlistLink}
          style={{ paddingLeft: `${itemPadding > 8 ? 8 : itemPadding}rem` }}
        >
          {nestedLevel === 0 && icon && (
            <ListItemIcon className={styles.navitemIcon}>{icon}</ListItemIcon>
          )}

          <ListItemText
            primary={label}
            secondary={t(`${item.id}.description`, { defaultValue: item.description || "" })}
            classes={{
              root: styles.navitemBody,
              primary: styles.navitemTitle,
              secondary: styles.navitemSubtitle,
            }}
          />

          {/* TODO */}
          {/* {item.badge} */}
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
};

export default NavLinkComponent;
