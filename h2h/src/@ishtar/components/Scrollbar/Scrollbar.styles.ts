import { createStyles } from "@mantine/core";
// import chroma from "chroma-js";

export type ScrollbarStylesParams = {
  scrollbarSize: number;
  offsetScrollbars?: boolean;
  hovered: boolean;
  enabled?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

export default createStyles(
  (
    theme,
    {
      scrollbarSize,
      offsetScrollbars,
      hovered,
      enabled,
      fullWidth,
      fullHeight,
    }: ScrollbarStylesParams
  ) => ({
    root: { overflow: enabled ? "hidden" : "unset" },
    viewport: {
      width: "100%",
      height: "100%",
      paddingRight: offsetScrollbars ? scrollbarSize : undefined,
      "& > div": {
        tableLayout: "fixed",
        width: fullWidth ? "100%" : undefined,
        height: fullHeight ? "100%" : undefined,
      },
    },
    scrollbar: {
      zIndex: 9999,
      display: "flex",
      userSelect: "none",
      touchAction: "none",
      boxSizing: "border-box",
      padding: `${scrollbarSize / 5}px`,
      transition: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`,

      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[1],

        "& .thumb": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.rgba("#FFFFFF", 0.5)
              : theme.fn.rgba("#000000", 0.5),
          // ? chroma("#FFFFFF").alpha(0.5).css()
          // : chroma("#000000").alpha(0.5).css(),
        },
      },

      '&[data-orientation="vertical"]': {
        width: scrollbarSize,
      },

      '&[data-orientation="horizontal"]': {
        flexDirection: "column",
        height: scrollbarSize,
      },

      '&[data-state="hidden"]': {
        opacity: 0,
      },
    },

    thumb: {
      position: "relative",
      flex: "1 1 0%",
      borderRadius: `${scrollbarSize}px`,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba("#FFFFFF", 0.4)
          : theme.fn.rgba("#000000", 0.4),
      // theme.colorScheme === "dark"
      //   ? chroma("#FFFFFF").alpha(0.4).css()
      //   : chroma("#000000").alpha(0.4).css(),
      transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)`,

      "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        minWidth: 44,
        minHeight: 44,
      },
    },

    corner: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[6] : theme.colors.gray[1],
      opacity: hovered ? 1 : 0,
      transition: `opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
    },
  })
);
