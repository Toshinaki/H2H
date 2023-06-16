import { memo } from "react";
import { AppShell, Aside, CloseButton, createStyles } from "@mantine/core";
import { useConfig } from "app/state/AppContext";
import Header from "./Header";

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === "dark";
  const borderColor = isDark ? theme.black : theme.colors.primary[0];

  return {
    root: { minWidth: 250 },
    header: {
      // backgroundColor: isDark ? theme.black : theme.white,
      backgroundColor: borderColor,
      color: isDark ? theme.white : theme.black,
    },
    main: {
      // borderColor: isDark ? theme.black : theme.white,
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
      classNames={{ root: classes.root, main: classes.main }}
    >
      {children}
    </AppShell>
  );
};

export default memo(Layout);
