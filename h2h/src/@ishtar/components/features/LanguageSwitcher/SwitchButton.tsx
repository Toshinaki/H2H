import { forwardRef, memo } from "react";

import { Avatar, createStyles, Text, UnstyledButton } from "@mantine/core";

export type SwitchButtonStyleParams = {
  size: number;
  maxWidth: number;
};

interface SwitchButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    SwitchButtonStyleParams {
  icon: string;
  text: string;
  opened?: boolean;
}

const useStyles = createStyles((theme, { size, maxWidth }: SwitchButtonStyleParams) => {
  const bgcolor = theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.dark[7];
  return {
    button: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
      width: maxWidth,
      height: size,

      "&:not(.opened)": {
        pointerEvents: "none",
      },
    },
    icon: {
      position: "absolute",
      left: 0,
      border: `3px solid ${bgcolor}`,
      pointerEvents: "none",
    },
    text: {
      width: size,
      height: size,
      borderRadius: size / 2,
      paddingLeft: size * 0.9,
      overflow: "hidden",
      backgroundColor: bgcolor,
      color: theme.white,
      fontSize: size * 0.6,
      display: "inline-flex",
      alignItems: "baseline",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
      pointerEvents: "all",
      transition: `width 0.35s ease`,

      "&:hover, &.opened": {
        width: maxWidth,
      },
    },
  };
});

const SwitchButton = forwardRef<HTMLButtonElement, SwitchButtonProps>(
  ({ size, maxWidth, opened, icon, text, ...props }, ref) => {
    const { classes, cx } = useStyles({ size, maxWidth });

    return (
      <UnstyledButton ref={ref} {...props} className={cx(classes.button, { opened })}>
        <Avatar src={icon} radius="xl" size={size * 1.1} className={classes.icon} />
        <Text span className={cx(classes.text, { opened })}>
          {text}
        </Text>
      </UnstyledButton>
    );
  }
);

export default memo(SwitchButton);
