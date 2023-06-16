import { forwardRef, memo } from "react";
import { NumberInput, NumberInputProps } from "@mantine/core";
import { Override } from "types";
import { CommonFieldProps } from "../types";

export type RHFNumberInputProps = Override<CommonFieldProps, NumberInputProps>;

const RHFNumberInput = forwardRef<HTMLInputElement, RHFNumberInputProps>(
  ({ setValue, isDirty, isTouched, autoComplete, variant, ...props }, ref): JSX.Element => {
    return <NumberInput ref={ref} {...props} />;
  }
);

export default memo(RHFNumberInput);
