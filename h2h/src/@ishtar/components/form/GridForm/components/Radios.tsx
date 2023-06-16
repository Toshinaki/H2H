import { forwardRef, memo } from "react";
import Radios, { RadiosProps } from "../../components/Radios";
import { Override } from "types";
import { CommonFieldProps } from "../types";

export type RHFRadiosProps = Override<CommonFieldProps, RadiosProps>;

const RHFRadios = forwardRef<HTMLDivElement, RHFRadiosProps>(
  ({ setValue, isDirty, isTouched, autoComplete, variant, ...props }, ref) => {
    return <Radios ref={ref} {...props} />;
  }
);

export default memo(RHFRadios);
