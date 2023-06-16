import React, { forwardRef, memo, useMemo } from "react";
import { CloseButton, Group, TextInput, TextInputProps } from "@mantine/core";
import DelayedTextInput from "../delayed/DelayedTextInput";
import { Override } from "types";

export type TextFieldProps = Override<
  TextInputProps,
  {
    clearable?: boolean;
    delay?: number;
    value?: string;
    onChange?: (value: string) => void;
    selectOnFocus?: boolean;
    onClear?: () => void;
  }
>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ clearable, delay, selectOnFocus, onFocus, onClick, onClear, ...props }, ref): JSX.Element => {
    const inputProps = useMemo(
      () => ({
        ...props,
        rightSection: (
          <Group align="center">
            {props.disabled || !clearable ? null : (
              <CloseButton
                aria-label="clear"
                onClick={() => {
                  props.onChange?.("");
                  onClear?.();
                }}
              />
            )}
            {props.rightSection}
          </Group>
        ),
      }),
      [clearable, onClear, props]
    );

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onFocus?.(event);
      if (selectOnFocus) {
        event.target.select();
      }
    };
    const handleClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
      // disable native datepicker
      if (props.type === "date") {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      return onClick?.(event);
    };

    return delay ? (
      <DelayedTextInput
        ref={ref}
        delay={delay}
        {...inputProps}
        onFocus={handleFocus}
        onClick={handleClick}
      />
    ) : (
      <TextInput
        ref={ref}
        {...inputProps}
        onChange={(event) => props.onChange?.(event.target.value)}
        onFocus={handleFocus}
        onClick={handleClick}
      />
    );
  }
);

export default memo(TextField);
