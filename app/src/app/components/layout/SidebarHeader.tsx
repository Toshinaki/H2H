import ToggleFoldIconButton from "@ig/components/layout/ToggleFoldIconButton";
import { Logo } from "../Logo";
import styles from "./Sidebar.module.css";

const SidebarHeader = () => (
  <div className={styles.sidebarHeader}>
    <Logo />

    <ToggleFoldIconButton position="left" />
  </div>
);

export default SidebarHeader;
