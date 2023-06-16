import {
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  Header as HeaderWrapper,
  HeaderProps as HeaderWrapperProps,
  createStyles,
  rem,
} from "@mantine/core";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";

import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import ControlButton from "./ControlButton";
import ColorModeToggler from "@ishtar/components/features/ColorModeToggler";
import ThemeSwitcher from "@ishtar/components/features/ThemeSwitcher";
import SimpleMenu from "@ishtar/components/menu/SimpleMenu";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: `${rem(16)}`,
  },
  controlWrapper: {
    // marginLeft: "auto",
    flexWrap: "nowrap",
    justifyContent: "center",

    "&.app-control": {
      marginLeft: "auto",
    },

    "& > button": {
      color: "inherit",
      transition: `background-color 0.2s ease, color 0.2s ease`,
    },
  },
  closeControl: {
    "&:hover": {
      backgroundColor: theme.colors.red[7],
      color: theme.white,
    },
  },
  menuButton: {
    height: "100%",
    color: "inherit",
  },
}));

type HeaderProps = Omit<HeaderWrapperProps, "height" | "withBorder" | "children">;

const Header = (props: HeaderProps) => {
  // const [opened, { toggle }] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const [maxmized, setMaxmized] = useState(false);

  const toggleMaximize = async () => {
    await appWindow.toggleMaximize();
    setMaxmized(await appWindow.isMaximized());
  };

  useEffect(() => {
    appWindow.isMaximized().then(setMaxmized);
  }, []);

  return (
    <HeaderWrapper height={28} withBorder={false} {...props}>
      <Box data-tauri-drag-region className={classes.root}>
        {/* Logo */}
        <Box>LOGO</Box>

        {/* menu items */}
        <Group spacing={0} className={classes.controlWrapper}>
          <SimpleMenu
            target={
              <Button variant="subtle" size="xs" className={classes.menuButton}>
                Help
              </Button>
            }
            items={[
              {
                type: "link",
                label: "Documentation",
                link: "https://github.com/Toshinaki/H2H",
              },
              {
                type: "item",
                label: "Report Issue",
                onClick: () => console.log("update"),
              },
              {
                type: "item",
                label: "Check for Updates...",
                onClick: () => console.log("update"),
              },
              "divider",
              {
                type: "item",
                label: "About",
                onClick: () => console.log("about"),
              },
            ]}
            position="bottom-start"
          />
        </Group>

        {/* App config control buttons */}
        <Group spacing="md" className={cx(classes.controlWrapper, "app-control")}>
          <ColorModeToggler size={20} variant="transparent" />
          <ThemeSwitcher size={18} />
        </Group>

        {/* Window control buttons */}
        <Group spacing={0} className={classes.controlWrapper}>
          <ControlButton onClick={() => appWindow.minimize()}>
            <VscChromeMinimize />
          </ControlButton>
          <ControlButton onClick={toggleMaximize}>
            {maxmized ? <VscChromeRestore /> : <VscChromeMaximize />}
          </ControlButton>
          <ControlButton onClick={() => appWindow.close()} className={classes.closeControl}>
            <VscChromeClose />
          </ControlButton>
        </Group>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
