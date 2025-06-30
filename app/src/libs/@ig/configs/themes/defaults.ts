import { alpha, type createTheme, type Theme } from "@mui/material/styles";
import type { PartialDeep } from "type-fest";

export const defaultThemeOptions: PartialDeep<Theme> = {
  typography: {
    fontFamily: ["Inter var", "Roboto", '"Helvetica"', "Arial", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small devices
      sm: 600, // Small devices
      md: 960, // Medium devices
      lg: 1280, // Large devices
      xl: 1920, // Extra large devices
    },
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {},
      styleOverrides: {
        root: {},
        fontSizeSmall: 16,
        fontSizeMedium: 20,
        fontSizeLarge: 24,
        // sizeSmall: {
        //   width: 16,
        //   height: 16,
        // },
        // sizeMedium: {
        //   width: 20,
        //   height: 20,
        // },
        // sizeLarge: {
        //   width: 24,
        //   height: 24,
        // },
      },
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    // MuiPickersPopper: {
    //   styleOverrides: {
    //     root: {
    //       zIndex: 99999,
    //     },
    //   },
    // },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          zIndex: 99999,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          color: alpha(theme.palette.text.primary, 0.7),
          transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.shortest,
          }),

          "&:hover": {
            color: theme.palette.text.primary,
          },
        }),
        sizeMedium: {
          width: 36,
          height: 36,
          maxHeight: 36,
        },
        sizeSmall: {
          width: 32,
          height: 32,
          maxHeight: 32,
        },
        sizeLarge: {
          width: 40,
          height: 40,
          maxHeight: 40,
        },
      },
    },
    MuiBadge: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      },
    },
    MuiAvatar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          width: 36,
          height: 36,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "text",
        color: "inherit",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          // lineHeight: 1,
        },
        sizeMedium: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          height: 36,
          minHeight: 36,
          maxHeight: 36,
        }),
        sizeSmall: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          height: 32,
          minHeight: 32,
          maxHeight: 32,
        }),
        sizeLarge: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          height: 40,
          minHeight: 40,
          maxHeight: 40,
        }),
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        contained: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {},
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {},
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          "& > .MuiFormHelperText-root": {
            marginLeft: 11,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        shrink: {
          transform: "translate(11px, -7px) scale(0.8)",
        },
        root: {
          transform: "translate(11px, 8px) scale(1)",
          "&.Mui-focused": {},
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        select: {
          minHeight: 0,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          minHeight: 36,
          lineHeight: 1,
        }),
        // legend: {
        //   fontSize: "0.75em",
        // },
        input: {
          padding: "5px 11px",
        },
        adornedStart: {
          paddingLeft: "11px!important",
        },
        sizeSmall: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          height: 32,
          minHeight: 32,
        }),
        // sizeMedium: {
        //   height: 36,
        //   minHeight: 36,
        //   borderRadius: 8,
        // },
        // sizeLarge: {
        //   height: 40,
        //   minHeight: 40,
        //   borderRadius: 8,
        // },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          // paddingLeft: 11
        },
        input: {
          padding: "5px 11px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          "&:before, &:after": {
            display: "none",
          },
        }),

        input: {
          padding: "5px 11px",
        },
      },
    },
    MuiSlider: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { color: "text.secondary" },
          style: {
            color: "text.secondary",
          },
        },
      ],
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          pointerEvents: "none",
        },
      },
    },
  },
};

/**
 * The mustHaveThemeOptions object defines the options that must be present in the MUI theme.
 */
export const mustHaveThemeOptions: PartialDeep<Parameters<typeof createTheme>[0]> = {
  typography: {
    htmlFontSize: 10,
    fontSize: 13,
    body1: {
      fontSize: "1.3rem",
    },
    body2: {
      fontSize: "1.3rem",
    },
  },
};
