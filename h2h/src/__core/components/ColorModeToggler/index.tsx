import { AnimatePresence } from "framer-motion";
import { memo } from "react";

import { ActionIcon, ActionIconProps, createStyles, useMantineColorScheme } from "@mantine/core";

import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const useStyles = createStyles(() => ({
  root: {
    "& svg": {
      outline: "none",
      "&:focus, & *, & *:focus": { outline: "none" },
    },
  },
}));

export type ColorModeTogglerProps = Omit<ActionIconProps, "onClick">;

const ColorModeToggler = ({ className, ...props }: ColorModeTogglerProps) => {
  const { classes, cx } = useStyles();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      {...props}
      className={cx(classes.root, className)}
    >
      <AnimatePresence>
        {colorScheme === "light" ? <SunIcon size="inherit" /> : <MoonIcon size="inherit" />}
      </AnimatePresence>
    </ActionIcon>
  );
};

export default memo(ColorModeToggler);
