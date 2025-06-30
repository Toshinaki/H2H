import { useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "@lodash";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Navigation } from "../Navigation";
import type { NavCollapse, NavigationItemComponentProps } from "../../types";
import styles from "../StandardNavigation.module.css";

const NavCollapseComponent = (props: NavigationItemComponentProps) => {
  const { t } = useTranslation("navigation");
  const { onItemClick, nestedLevel = 0, showTooltip } = props;
  const item = props.item as NavCollapse;

  const [open, setOpen] = useState(false);

  const icon = item.Icon ? <item.Icon className={styles.navitemIcon} /> : undefined;

  const label = t(`${item.id}.name`, { defaultValue: item.name || "" });

  const itemPadding = nestedLevel > 0 ? 2.8 + nestedLevel : 1.2;

  return (
    <>
      <Tooltip title={props.showTooltip && label} placement="right">
        <ListItem data-open={open} className={styles.navitem}>
          <ListItemButton
            onClick={() => setOpen((curr) => !curr)}
            disabled={item.disabled}
            className={styles.navlistCollapse}
            style={{ paddingLeft: `${itemPadding > 8 ? 8 : itemPadding}rem` }}
          >
            {icon && <ListItemIcon className={styles.navitemIcon}>{icon}</ListItemIcon>}

            <ListItemText
              primary={label}
              secondary={t(`${item.id}.description`, { defaultValue: item.description || "" })}
              classes={{
                root: styles.navitemBody,
                primary: styles.navitemTitle,
                secondary: styles.navitemSubtitle,
              }}
            />

            <div className={styles.collapseIconWrapper}>
              <ExpandMore />
            </div>
          </ListItemButton>
        </ListItem>
      </Tooltip>

      <Collapse in={open} component="li" className={styles.navlistCollapseChildren}>
        <Navigation
          navigations={item.items}
          onItemClick={onItemClick}
          nestedLevel={nestedLevel + 1}
          showTooltip={showTooltip}
        />
      </Collapse>
    </>
  );
};

export default NavCollapseComponent;
