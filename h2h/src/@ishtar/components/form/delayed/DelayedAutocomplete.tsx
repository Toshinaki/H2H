import { memo, useState } from "react";
import { useTimeout } from "@ishtar/hooks";
import { Autocomplete, AutocompleteProps, CloseButton } from "@mantine/core";

export type DelayedAutocompleteProps = { delay?: number } & AutocompleteProps;

const DelayedAutocomplete = ({
  value: initialValue,
  onChange,
  delay = 200,
  ...props
}: DelayedAutocompleteProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);

  useTimeout(() => onChange?.(value || ""), delay);

  return (
    <Autocomplete
      {...props}
      value={value}
      onChange={setValue}
      rightSection={
        props.disabled ? undefined : <CloseButton aria-label="clear" onClick={() => setValue("")} />
      }
    />
  );
};

export default memo(DelayedAutocomplete);
