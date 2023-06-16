import { memo, useRef, useState } from "react";
import { useUpdateEffect } from "@ishtar/hooks";
import {
  ActionIcon,
  Button,
  ButtonProps,
  Group,
  MantineSize,
  Stack,
  TextInputProps,
} from "@mantine/core";
import { MdAdd } from "react-icons/md";
import TextField from "./TextField";
import { IconType } from "react-icons";
import { Override } from "types";

type ActionInputProps = Override<
  TextInputProps,
  {
    clearable?: boolean;
    delay?: number;
    onChange?: (value?: TextInputProps["value"]) => void;
    selectOnFocus?: boolean;
    icon?: IconType;
    innerAdd?: boolean;
    addIcon?: IconType;
    onAdd: (value: string) => void;
    addOnEnter?: boolean;
    onCancel?: () => void;
    cancelOnEscape?: boolean;
    buttonProps?: ButtonProps;
    saveButtonText?: string;
    saveButtonProps?: ButtonProps;
    cancelButtonText?: string;
    cancelButtonProps?: ButtonProps;
  }
>;

const ActionInput = (props: ActionInputProps): JSX.Element => {
  const {
    value: initialValue,
    icon: Icon,
    size = "sm",
    onChange,
    innerAdd,
    addIcon: AddIcon = MdAdd,
    onAdd,
    addOnEnter = true,
    onCancel,
    cancelOnEscape = true,
    buttonProps,
    saveButtonText = "Save",
    saveButtonProps,
    cancelButtonText = "Cancel",
    cancelButtonProps,
    ...rest
  } = props;

  const [value, setValue] = useState(initialValue || "");
  useUpdateEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    if (value) {
      onAdd?.(String(value));
      setValue("");
      inputRef.current?.focus();
    }
  };
  const handleCancel = () => {
    onCancel?.();
    setValue("");
  };

  const handleChange = (value?: string | number | readonly string[] | undefined) => {
    setValue(value || "");
    onChange?.(value);
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    switch (event.key) {
      case "Enter":
        if (addOnEnter) handleAdd();
        break;
      case "Escape":
        if (cancelOnEscape) handleCancel();
        break;
      default:
        break;
    }
  };

  return (
    <Stack>
      <TextField
        ref={inputRef}
        {...rest}
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        size={size}
        icon={
          Icon && <Icon size={getIconSize(size)} color={rest.disabled ? "disabled" : "inherit"} />
        }
        rightSection={
          innerAdd && (
            <ActionIcon
              color="primary"
              size={getIconSize(size)}
              radius={rest.radius}
              variant="filled"
              disabled={rest.disabled}
              onClick={handleAdd}
            >
              <AddIcon size={getIconSize(size)} />
            </ActionIcon>
          )
        }
        rightSectionWidth={getButtonWidth(size)}
      />
      {!innerAdd && (
        <Group>
          <Button {...buttonProps} {...saveButtonProps} size={size} onClick={handleAdd}>
            {saveButtonText}
          </Button>
          {onCancel && (
            <Button {...buttonProps} {...cancelButtonProps} size={size} onClick={handleCancel}>
              {cancelButtonText}
            </Button>
          )}
        </Group>
      )}
    </Stack>
  );
};

export default memo(ActionInput);

const getIconSize = (size: MantineSize) => {
  switch (size) {
    case "xs":
      return 20;
    case "md":
      return 36;
    case "lg":
      return 40;
    case "xl":
      return 50;
    default:
    case "sm":
      return 28;
  }
};

const getButtonWidth = (size: MantineSize) => {
  switch (size) {
    case "xs":
      return 32;
    case "md":
      return 44;
    case "lg":
      return 52;
    case "xl":
      return 62;
    default:
    case "sm":
      return 38;
  }
};
