import { useAppStore } from "store";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import getTheme from "@ig/utils/getTheme";
import CssBaseline from "@mui/material/CssBaseline";

const Theme = ({ children }: React.PropsWithChildren) => {
  const {
    layout: {
      main: { theme },
    },
    scale,
    radius,
  } = useAppStore((state) => state.config.current.ui);

  return (
    <ThemeProvider
      theme={getTheme({
        id: theme,
        scale,
        radius,
      })}
    >
      <CssBaseline />
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default Theme;
