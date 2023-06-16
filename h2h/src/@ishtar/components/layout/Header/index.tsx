import ColorModeToggler from "@ishtar/components/features/ColorModeToggler";
import LanguageSwitcher from "@ishtar/components/features/LanguageSwitcher";
import ThemeSwitcher from "@ishtar/components/features/ThemeSwitcher";
import {
  Box,
  createStyles,
  Group,
  Header as HeaderWrapper,
  HeaderProps as HeaderWrapperProps,
  rem,
} from "@mantine/core";

import { useControlWrapperStyles } from "./header.styles";
import MenuGroups from "./MenuGroups";
import WindowControls from "./WindowControls";

const useStyles = createStyles(() => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: `${rem(16)}`,
  },
}));

type HeaderProps = Omit<HeaderWrapperProps, "height" | "withBorder" | "children">;

const Header = (props: HeaderProps) => {
  const { classes, cx } = useStyles();
  const {
    classes: { controlWrapper },
  } = useControlWrapperStyles();

  return (
    <HeaderWrapper height={28} withBorder={false} {...props}>
      <Box data-tauri-drag-region className={classes.root}>
        {/* Logo */}
        <Box>LOGO</Box>

        {/* menu items */}
        <MenuGroups />

        {/* App config control buttons */}
        <Group spacing="md" className={cx(controlWrapper, "app-control")}>
          <ColorModeToggler size={22} variant="transparent" />
          <ThemeSwitcher size={22} />
          <LanguageSwitcher size={22} />
        </Group>

        {/* Window control buttons */}
        <WindowControls />
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
