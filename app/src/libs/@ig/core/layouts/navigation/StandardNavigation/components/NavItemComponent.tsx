import { useTranslation } from "react-i18next";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import NavLinkAdapter from "../../NavLinkAdapter";
import type { NavigationItemComponentProps, NavItem } from "../../types";
import styles from "../StandardNavigation.module.css";

const NavItemComponent = (props: NavigationItemComponentProps) => {
  const { t } = useTranslation("navigation");
  const item = props.item as NavItem & { path: string };

  const icon = item.Icon ? <item.Icon className={styles.navitemIcon} /> : undefined;

  const label = t(`${item.id}.name`, { defaultValue: item.name || "" });

  return (
    <Tooltip title={props.showTooltip && label} placement="right">
      <ListItem onClick={(e) => props.onItemClick?.(item, e)} className={styles.navitem}>
        <ListItemButton
          component={NavLinkAdapter}
          to={item.path}
          activeOptions={{ exact: item.exact }}
          activeProps={{ className: styles.isActive }}
          disabled={item.disabled}
          className={styles.navlistItem}
        >
          {icon && <ListItemIcon className={styles.navitemSection}>{icon}</ListItemIcon>}

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

        {/* <NavLinkAdapter
          to={item.path}
          activeOptions={{ exact: item.exact }}
          disabled={item.disabled}
          {...props.itemProps}
          className={styles.navlistItem}
        >
          {({ isActive, isTransitioning }) => (
            <ListItemButton
              component="button"
              onClick={(e) => props.onItemClick?.(item, e)}
              className={clsx(
                styles.navitem,
                isActive && styles.isActive,
                isTransitioning && styles.isTransitioning,
              )}
            >
              {icon && <ListItemIcon className={styles.navitemSection}>{icon}</ListItemIcon>}

              <ListItemText
                primary={label}
                secondary={t(`${item.id}.description`, { defaultValue: item.description || "" })}
                classes={{
                  root: styles.navitemBody,
                  primary: styles.navitemTitle,
                  secondary: styles.navitemSubtitle,
                }}
              />
            </ListItemButton>
          )}
        </NavLinkAdapter> */}
      </ListItem>
    </Tooltip>
  );
};

export default NavItemComponent;
