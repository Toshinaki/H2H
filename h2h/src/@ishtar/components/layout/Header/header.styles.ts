import { createStyles, rem } from "@mantine/core";

export const useControlWrapperStyles = createStyles(() => ({
  controlWrapper: {
    // marginLeft: "auto",
    height: "100%",
    flexWrap: "nowrap",
    justifyContent: "center",

    "&.menu": {
      padding: `${rem(4)}`,
    },
    "&.app-control": {
      marginLeft: "auto",
      pointerEvents: "none",
    },

    "& > button": {
      color: "inherit",
      transition: `background-color 0.2s ease, color 0.2s ease`,
    },
  },
}));
