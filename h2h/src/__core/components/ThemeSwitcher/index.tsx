import { forwardRef, memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { useConfig } from "app/state/AppContext";

import {
  ColorSwatch,
  ColorSwatchProps,
  Flex,
  MantineProvider,
  Menu,
  ScrollArea,
  Tooltip,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { MdCheck } from "react-icons/md";

import { THEMES, ThemeType } from "app/configs/themes";

const useStyles = createStyles((theme) => ({
  dropdown: { maxWidth: 265, display: "flex", [theme.fn.smallerThan("sm")]: { maxHeight: 260 } },
  wrapper: { width: "100%", height: "100%" },
  optionWrapper: { width: "auto" },
  option: {
    color: theme.white,
    cursor: "pointer",
  },
}));

type ThemeSwitcherProps = Omit<ColorSwatchProps, "component" | "color">;

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { classes } = useStyles();
  const {
    config: { theme },
    updateConfig,
  } = useConfig();

  const { t } = useTranslation("colors");

  return (
    <MantineProvider theme={{ colorScheme: "dark" }} inherit>
      <Menu position="bottom" withArrow>
        <Menu.Target>
          <Tooltip label={t(theme)} openDelay={500} closeDelay={200} withinPortal>
            <ThemeOption {...props} className={classes.option} />
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown className={classes.dropdown}>
          <ScrollArea scrollbarSize={1} className={classes.wrapper}>
            <Flex
              direction={{ base: "column", sm: "row" }}
              wrap={{ base: "nowrap", sm: "wrap" }}
              align="center"
              justify={{ base: "center", sm: "flex-start" }}
            >
              {Object.entries(THEMES)
                .filter(([thm]) => !["default"].includes(thm))
                .map(([thm, themeOverride]) => (
                  <Tooltip key={thm} label={t(thm)} openDelay={500} closeDelay={200} withinPortal>
                    <Menu.Item
                      onClick={() => updateConfig("theme", thm as ThemeType)}
                      disabled={thm === theme}
                      className={classes.optionWrapper}
                    >
                      <MantineProvider theme={themeOverride} inherit>
                        <ThemeOption
                          {...props}
                          checked={theme === thm}
                          className={classes.option}
                        />
                      </MantineProvider>
                    </Menu.Item>
                  </Tooltip>
                ))}
            </Flex>
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </MantineProvider>
  );
};

export default memo(ThemeSwitcher);

interface ThemeOptionProps extends Omit<ColorSwatchProps, "color"> {
  checked?: boolean;
}

const ThemeOption = forwardRef<HTMLDivElement, ThemeOptionProps>(({ checked, ...props }, ref) => {
  const theme = useMantineTheme();

  return (
    <ColorSwatch
      ref={ref}
      {...props}
      component={motion.div}
      whileTap={{ translateY: 2 }}
      color={theme.colors.primary[5]}
    >
      {checked && <MdCheck />}
    </ColorSwatch>
  );
});
ThemeOption.displayName = "ThemeOption";
