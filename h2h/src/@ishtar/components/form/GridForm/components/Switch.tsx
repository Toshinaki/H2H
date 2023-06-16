import { forwardRef, memo } from "react";
import { Switch, SwitchProps } from "@mantine/core";
import { Override } from "types";
import { CommonFieldProps } from "../types";

export type RHFSwitchProps = Override<CommonFieldProps, SwitchProps>;

const RHFSwitch = forwardRef<HTMLInputElement, RHFSwitchProps>(
  ({ setValue, isDirty, isTouched, autoComplete, variant, ...props }, ref): JSX.Element => {
    return <Switch ref={ref} {...props} />;
  }
);

export default memo(RHFSwitch);
