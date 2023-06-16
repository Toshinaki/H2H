import { forwardRef, memo, useEffect, useState } from "react";
import { useTimeout } from "@mantine/hooks";
import { TextInputProps, TextInput } from "@mantine/core";
import { Override } from "types";

type DelayedTextInputProps = Override<
  TextInputProps,
  { delay?: number; value?: string; onChange?: (value: string) => void }
>;

const DelayedTextInput = forwardRef<HTMLInputElement, DelayedTextInputProps>(
  ({ value: initialValue, onChange, delay = 200, ...props }, ref): JSX.Element => {
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const { start, clear } = useTimeout(() => onChange?.(value || ""), delay);
    useEffect(() => {
      clear();
      start();

      return () => {
        clear();
      };
    }, [clear, start, value]);

    return (
      <TextInput
        ref={ref}
        {...props}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  }
);

export default memo(DelayedTextInput);
