import { useAppStore } from "store";
import { useShouldSidebarFold } from "@ig/core/layouts/app-layout/hooks";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";

interface ToggleFoldIconButtonProps extends Omit<IconButtonProps, "children" | "onClick"> {
  position: "left" | "right";
  foldIcon?: React.ReactNode;
  unfoldIcon?: React.ReactNode;
}

const ToggleFoldIconButton = ({
  position,
  foldIcon,
  unfoldIcon,
  ...props
}: ToggleFoldIconButtonProps) => {
  const { toggleSidebarFold, layout } = useAppStore((state) => state.ui);
  const shouldFold = useShouldSidebarFold(position);
  const folded = layout[`${position}Sidebar`].folded;

  return (
    !shouldFold && (
      <IconButton onClick={() => toggleSidebarFold(position, undefined, true)} {...props}>
        {folded ? unfoldIcon || <PushPinOutlinedIcon /> : foldIcon || <PushPinIcon />}
      </IconButton>
    )
  );
};

export default ToggleFoldIconButton;
