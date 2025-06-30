import { useAppStore } from "store";
import { useShouldSidebarClose } from "@ig/core/layouts/app-layout/hooks";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import Portal from "@mui/material/Portal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ToggleOpenIconButtonProps extends Omit<IconButtonProps, "children" | "onClick"> {
  position: "left" | "right";
  closeIcon?: React.ReactNode;
  openIcon?: React.ReactNode;
}

const ToggleOpenIconButton = ({
  position,
  closeIcon,
  openIcon,
  ...props
}: ToggleOpenIconButtonProps) => {
  const { toggleSidebarOpen, toggleSidebarHiddenOpen, layout } = useAppStore((state) => state.ui);
  const shouldAutoClose = useShouldSidebarClose(position);
  const { opened, hiddenOpened } = layout[`${position}Sidebar`];

  return (
    <Portal
      disablePortal={shouldAutoClose ? hiddenOpened : opened}
      container={() => document.querySelector("#ig-layout")}
    >
      <IconButton
        data-closed={shouldAutoClose ? !hiddenOpened : !opened}
        onClick={() =>
          shouldAutoClose
            ? toggleSidebarHiddenOpen(position)
            : toggleSidebarOpen(position, undefined, true)
        }
        {...props}
      >
        {(shouldAutoClose ? hiddenOpened : opened)
          ? closeIcon || (position === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />)
          : openIcon || (position === "left" ? <ChevronRightIcon /> : <ChevronLeftIcon />)}
      </IconButton>
    </Portal>
  );
};

export default ToggleOpenIconButton;
