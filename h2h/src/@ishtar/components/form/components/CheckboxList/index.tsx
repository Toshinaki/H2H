import React, { memo } from "react";
import {
  Checkbox,
  CheckboxGroupProps,
  CheckboxProps as MantineCheckboxProps,
  Stack,
  StackProps,
} from "@mantine/core";

export type CheckboxProps = Omit<MantineCheckboxProps, "value" | "label"> & {
  value: string | number;
  label: React.ReactNode;
};

export type CheckboxListProps = Omit<CheckboxGroupProps, "children"> & {
  items: Array<CheckboxProps>;
  commonProps?: Omit<MantineCheckboxProps, "value" | "label">;
  wrapperProps?: StackProps;
};

const CheckboxList = ({ items, commonProps, wrapperProps, ...props }: CheckboxListProps) => {
  return (
    <Checkbox.Group {...props}>
      <Stack {...wrapperProps}>
        {items.map((item) => (
          <Checkbox key={item.value} {...commonProps} {...item} />
        ))}
      </Stack>
    </Checkbox.Group>
  );
};

export default memo(CheckboxList);
