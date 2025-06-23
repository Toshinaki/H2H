import { useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "@lodash";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
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

  return (
    <>
      <Tooltip title={props.showTooltip && label} placement="right">
        <ListItem
          secondaryAction={
            <IconButton onClick={() => setOpen((curr) => !curr)}>
              <ExpandMore />
            </IconButton>
          }
          className={styles.navitem}
        >
          <ListItemButton disabled={item.disabled} className={styles.navlistCollapse}>
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
        </ListItem>
      </Tooltip>

      <Collapse in={open}>
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
