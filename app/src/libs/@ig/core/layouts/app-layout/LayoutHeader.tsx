import { useAppStore } from "store";
import { useScrollContext } from "@ig/components/scroll/ScrollProvider";
import { useHeaderPinned } from "@ig/hooks/use-header-pinned";
import getTheme from "@ig/utils/get-theme";
import { ThemeProvider } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const LayoutHeader = ({ children }: React.PropsWithChildren) => {
  const {
    layout: {
      header: { autohide: headerAutoHide, theme: themeId },
    },
    scroll,
  } = useAppStore((state) => state.config.current.ui);
  const { scrollRef } = useScrollContext();
  const [atTop, shouldShow] = useHeaderPinned({ scrollRef, fixedAt: headerAutoHide.scrollHeight });

  const id = "header";
  const theme = getTheme({
    id: themeId,
    // cssVariables: { cssVarPrefix: "ig", rootSelector: `#${id}` },
  });

  return (
    <ThemeProvider theme={theme}>
      {scroll === "page" ? (
        <>
          <Slide appear={false} direction="down" in={atTop || shouldShow}>
            <AppBar id={id} data-pinned={headerAutoHide.scrollHeight > 0 ? atTop : undefined}>
              <Toolbar>{children}</Toolbar>
            </AppBar>
          </Slide>

          <AppBar
            id={`${id}-fixed`}
            data-placeholder
            data-pinned={atTop}
            data-show={shouldShow}
            style={{ visibility: "hidden" }}
          />
        </>
      ) : (
        <>
          {headerAutoHide.scrollHeight > 0 && (
            <Slide appear={false} direction="down" in={!atTop && shouldShow}>
              <AppBar id={`${id}-fixed`}>{!atTop && <Toolbar>{children}</Toolbar>}</AppBar>
            </Slide>
          )}

          <AppBar id={id} data-pinned>
            {atTop && <Toolbar>{children}</Toolbar>}
          </AppBar>
        </>
      )}
    </ThemeProvider>
  );
};

export default LayoutHeader;
