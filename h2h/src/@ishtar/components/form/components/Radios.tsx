import { forwardRef, memo } from "react";
import { RadioGroupProps, Radio, RadioProps } from "@mantine/core";

export type RadiosProps = Omit<RadioGroupProps, "children"> & {
  data: Array<Omit<RadioProps, "children">>;
  dataCommonProps?: Omit<RadioProps, "label" | "value" | "children">;
  disabled?: boolean;
};

const Radios = forwardRef<HTMLDivElement, RadiosProps>(({ data, disabled, ...props }, ref) => {
  return (
    <Radio.Group ref={ref} {...props}>
      {data.map(({ value, ...rest }) => (
        <Radio key={value} {...rest} value={value} disabled={disabled || rest.disabled} />
      ))}
    </Radio.Group>
  );
});

export default memo(Radios);
