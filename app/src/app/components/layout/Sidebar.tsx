import { useSmallerThan } from "@ig/hooks";
import { StandardNavbar } from "@ig/core/layouts/navbar";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import { NAVIGATIONS } from "configs/navigation.config";

const Navbar = () => {
  const isSmall = useSmallerThan();

  return (
    <StandardNavbar
      header={<SidebarHeader />}
      navigations={NAVIGATIONS}
      footer={<SidebarFooter />}
      style={{ "--navbar-header-height": isSmall ? "3rem" : "4.75rem" } as React.CSSProperties}
    />
  );
};

export default Navbar;
