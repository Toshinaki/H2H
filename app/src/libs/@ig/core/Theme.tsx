import { useAppStore } from "store";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import getTheme from "@ig/utils/getTheme";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

const Theme = ({ children }: React.PropsWithChildren) => {
  const {
    layout: {
      main: { theme: themeId },
    },
    scale,
    radius,
  } = useAppStore((state) => state.config.current.ui);
  const theme = getTheme({
    id: themeId,
    scale,
    radius,
    cssVariables: { rootSelector: "#root", cssVarPrefix: "root" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--app-scale": scale,
            "--ig-transition-duration-complex": `${theme.transitions.duration.complex}ms`,
            "--ig-transition-duration-enteringScreen": `${theme.transitions.duration.enteringScreen}ms`,
            "--ig-transition-duration-leavingScreen": `${theme.transitions.duration.leavingScreen}ms`,
            "--ig-transition-duration-short": `${theme.transitions.duration.short}ms`,
            "--ig-transition-duration-shorter": `${theme.transitions.duration.shorter}ms`,
            "--ig-transition-duration-shortest": `${theme.transitions.duration.shortest}ms`,
            "--ig-transition-duration-standard": `${theme.transitions.duration.standard}ms`,
            "--ig-transition-easing-easeIn": theme.transitions.easing.easeIn,
            "--ig-transition-easing-easeInOut": theme.transitions.easing.easeInOut,
            "--ig-transition-easing-easeOut": theme.transitions.easing.easeOut,
            "--ig-transition-easing-sharp": theme.transitions.easing.sharp,
          },
        }}
      />
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default Theme;
