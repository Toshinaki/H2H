import clsx from "clsx";
import _ from "@lodash";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { StandardNavigation } from "../../navigation/StandardNavigation";
import { ScrollArea } from "@ig/components/scroll/ScrollArea";
import type { NavbarProps } from "../types";
import styles from "../navbar.module.css";

const StandardNavbar = ({
  navigations,
  header,
  footer,
  itemProps,
  className,
  ...rest
}: NavbarProps) => {
  const startNavs = navigations.filter((nav) => "position" in nav && nav.position === "start");
  const endNavs = navigations.filter((nav) => "position" in nav && nav.position === "end");
  const centerNavs = _.dropRightWhile(
    _.dropWhile(_.xorBy(navigations, [...startNavs, ...endNavs], "id"), { type: "divider" }),
    { type: "divider" },
  );

  return (
    <Box data-variant="standard" {...rest} className={clsx(styles.navbar, className)}>
      {(header || startNavs.length > 0) && (
        <Stack className={styles.navbarHeader}>
          {header}
          {startNavs.length > 0 && (
            <StandardNavigation
              navigations={startNavs}
              // onItemClick={handleItemClick}
              itemProps={itemProps}
            />
          )}
        </Stack>
      )}

      <Stack component={ScrollArea} scrollbars="y" className={styles.navbarCenter}>
        {centerNavs.length > 0 && (
          <StandardNavigation
            navigations={centerNavs}
            // onItemClick={handleItemClick}
            itemProps={itemProps}
          />
        )}
      </Stack>

      {(footer || endNavs.length > 0) && (
        <Stack className={styles.navbarFooter}>
          {endNavs.length > 0 && (
            <StandardNavigation
              navigations={endNavs}
              // onItemClick={handleItemClick}
              itemProps={itemProps}
            />
          )}
          {footer}
        </Stack>
      )}
    </Box>
  );
};

export default StandardNavbar;
