import React, { memo, useCallback, useMemo, useState } from "react";
import { useUpdateEffect } from "@ishtar/hooks";
import { clsx, Menu, MenuItemProps, MenuProps, MenuDropdownProps } from "@mantine/core";

type BaseMenuItemType = {
  type: "item" | "link";
  label: React.ReactNode;
  value?: unknown;
  onClick?: () => void;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  props?: Omit<MenuItemProps, "icon" | "disabled" | "onClick" | "children"> & {
    [key: string]: unknown;
  };
};

export type MenuItemType = BaseMenuItemType & {
  type: "item";
  disabled?: boolean;
};

export type LinkMenuItemType = BaseMenuItemType & {
  type: "link";
  link: string;
};

export type SimpleMenuItemType = MenuItemType | LinkMenuItemType | "divider" | string;

export type SimpleMenuProps = MenuProps & {
  id?: string;
  target: React.ReactNode;
  items: Array<SimpleMenuItemType>;
  selected?: number;
  onClick?: (item: MenuItemType) => void;
  itemProps?: Omit<MenuItemProps, "icon" | "rightSction" | "disabled" | "onClick" | "children">;
  dropdownProps?: MenuDropdownProps;
};

const SimpleMenu = ({
  target,
  items,
  selected,
  onClick,
  itemProps,
  dropdownProps,
  ...props
}: SimpleMenuProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(selected);
  useUpdateEffect(() => {
    setSelectedIndex(selected);
  }, [selected]);

  const handleClick = useCallback(
    (item: MenuItemType, index: number) => {
      if (selectedIndex !== index) {
        selected !== undefined && setSelectedIndex(index);
        item.onClick?.();
        onClick?.(item);
      }
    },
    [onClick, selected, selectedIndex]
  );

  const menuItems = useMemo(
    () => (
      <>
        {items.map((item, index) =>
          item === "divider" ? (
            <Menu.Divider key={index} />
          ) : typeof item === "string" ? (
            <Menu.Label>{item}</Menu.Label>
          ) : item.type === "link" ? (
            <Menu.Item
              key={index}
              {...itemProps}
              {...item.props}
              component="a"
              href={item.link}
              target="_blank"
              icon={item.icon}
              rightSection={item.rightIcon || item.props?.rightSection}
              className={clsx(
                { selected: index === selectedIndex },
                itemProps?.className,
                item.props?.className
              )}
            >
              {item.label}
            </Menu.Item>
          ) : (
            <Menu.Item
              key={index}
              {...itemProps}
              {...item.props}
              icon={item.icon}
              rightSection={item.rightIcon || item.props?.rightSection}
              disabled={item.disabled}
              onClick={() => handleClick(item, index)}
              className={clsx(
                { selected: index === selectedIndex },
                itemProps?.className,
                item.props?.className
              )}
            >
              {item.label}
            </Menu.Item>
          )
        )}
      </>
    ),
    [handleClick, itemProps, items, selectedIndex]
  );

  return (
    <Menu offset={0} shadow="md" width={200} {...props}>
      <Menu.Target>{target}</Menu.Target>

      <Menu.Dropdown {...dropdownProps}>{menuItems}</Menu.Dropdown>
    </Menu>
  );
};

export default memo(SimpleMenu);
