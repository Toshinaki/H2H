import { memo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import i18n from "i18n";
import { AppShell, Aside, CloseButton, createStyles } from "@mantine/core";
import { useConfig } from "app/state/AppContext";
import Header from "./Header";

dayjs.extend(utc);
dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === "dark";
  const borderColor = isDark ? theme.black : theme.colors.primary[0];

  return {
    root: { minWidth: 250, height: "100vh" },
    header: {
      // backgroundColor: isDark ? theme.black : theme.white,
      backgroundColor: borderColor,
      color: isDark ? theme.white : theme.black,
    },
    body: { height: "100%" },
    main: {
      height: "100%",
      borderColor: borderColor,
      borderWidth: 5,
      borderTopWidth: 0,
      borderStyle: "solid",
      backgroundColor: theme.colors.primary[isDark ? 8 : 2],
    },
  };
});

const Layout = ({ children }: React.PropsWithChildren) => {
  const { classes } = useStyles();

  const {
    config: { sidebar },
    updateConfig,
  } = useConfig();

  return (
    <AppShell
      padding="sm"
      header={<Header className={classes.header} />}
      aside={
        sidebar.open ? (
          <Aside p="md" width={{ base: 250, md: 400 }}>
            <CloseButton size="sm" onClick={() => updateConfig("sidebar.open", false)} ml="auto" />
            download config
          </Aside>
        ) : undefined
      }
      className={`app-root ${i18n.resolvedLanguage}`}
      classNames={{ root: classes.root, body: classes.body, main: classes.main }}
    >
      {children}
    </AppShell>
  );
};

export default memo(Layout);
