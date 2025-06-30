import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import NavLinkAdapter from "@ig/core/layouts/navigation/NavLinkAdapter";
import ToggleOpenIconButton from "@ig/components/layout/ToggleOpenIconButton";
import styles from "./Sidebar.module.css";

const SidebarFooter = () => (
  <div className={styles.sidebarFooter}>
    <IconButton component={NavLinkAdapter} to="/settings" className={styles.settingsButton}>
      <SettingsIcon className={styles.settingsIcon} />
    </IconButton>

    <ToggleOpenIconButton position="left" className={styles.toggleButton} />
  </div>
);

export default SidebarFooter;
