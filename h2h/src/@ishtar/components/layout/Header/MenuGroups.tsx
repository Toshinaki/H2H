import { memo, useState } from "react";
import { useMenuItemGroups } from "./header.hooks";
import { useFocusWithin } from "@mantine/hooks";
import { Group, UnstyledButton, clsx, createStyles, rem } from "@mantine/core";
import SimpleMenu, { SimpleMenuItemType } from "@ishtar/components/menu/SimpleMenu";
import { useControlWrapperStyles } from "./header.styles";

const useStyles = createStyles((theme) => ({
  menuButton: {
    borderRadius: `${rem(8)}`,
    padding: `${rem(4)} ${rem(16)}`,
    color: "inherit",
    fontSize: `${rem(14)}`,

    "&:hover, &.opened": {
      backgroundColor: theme.colorScheme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)",
    },
  },
}));

type MenuGroupProps = {
  target: string;
  items: Array<SimpleMenuItemType>;
  opened: string;
  handleOpen(target: string): void;
  handleClose(): void;
  handleBlur(): void;
};

const MenuGroup = ({
  target,
  items,
  opened,
  handleOpen,
  handleClose,
  handleBlur,
}: MenuGroupProps) => {
  const { classes, cx } = useStyles();

  return (
    <SimpleMenu
      opened={opened === target}
      onOpen={() => handleOpen(target)}
      onClose={handleClose}
      position="bottom-start"
      offset={3}
      target={
        <UnstyledButton
          onMouseEnter={() => !!opened && handleOpen(target)}
          className={cx(classes.menuButton, opened === target && "opened")}
        >
          {target}
        </UnstyledButton>
      }
      items={items}
      dropdownProps={{ onBlur: handleBlur }}
    />
  );
};

const MenuGroups = () => {
  const {
    classes: { controlWrapper },
  } = useControlWrapperStyles();

  const menuItemGroups = useMenuItemGroups();
  const { ref, focused } = useFocusWithin();

  const [menuOpened, setMenuOpened] = useState("");
  const closeMenu = () => setMenuOpened("");

  return (
    <Group ref={ref} spacing={0} className={clsx(controlWrapper, "menu")}>
      {Object.entries(menuItemGroups).map(([target, items]) => (
        <MenuGroup
          key={target}
          target={target}
          items={items}
          opened={menuOpened}
          handleOpen={setMenuOpened}
          handleClose={closeMenu}
          handleBlur={() => !focused && closeMenu()}
        />
      ))}
    </Group>
  );
};

export default memo(MenuGroups);
