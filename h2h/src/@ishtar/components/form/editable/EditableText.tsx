import { memo, useEffect, useState } from "react";
import { createStyles, DefaultProps, MantineSize, Selectors, Text, TextProps } from "@mantine/core";
import TextField, { TextFieldProps } from "../components/TextField";

type EditableTextProps = TextFieldProps & {
  textProps?: Omit<TextProps, "className" | "size">;
} & DefaultProps<Selectors<typeof useStyles>>;

type EditableTextStylesParams = {
  size: MantineSize;
};
const useStyles = createStyles((theme, { size }: EditableTextStylesParams) => {
  const height =
    size === "xs" ? 30 : size === "md" ? 42 : size === "lg" ? 50 : size === "xl" ? 60 : 36;
  return {
    common: {
      padding: ".1rem 1.2rem",
      fontSize: "inherit",
      fontWeight: "inherit",
      color: "inherit",
    },
    inputWrapper: { flex: "1 1 0%" },
    input: {
      // paddingLeft: "1.2rem",
      // paddingRight: "1.2rem",
      // fontSize: "inherit",
      // fontWeight: "inherit",
      // color: "inherit",
    },
    text: {
      flex: "1 1 0%",
      height,
      border: "1px solid transparent",
      // display: "flex",
      // alignItems: "center",
      lineHeight: `${height - 4}px`,
      cursor: "text",
      wordBreak: "break-word",
      // paddingLeft: "1.2rem",
      // paddingRight: "1.2rem",
      // fontSize: "inherit",
      // fontWeight: "inherit",
      // color: "inherit",
    },
  };
});

const EditableText = ({
  value: initialValue,
  onChange,
  textProps,
  disabled,
  size = "sm",
  className,
  ...props
}: EditableTextProps): JSX.Element => {
  const { classes, cx } = useStyles({ size });

  const [value, setValue] = useState<TextFieldProps["value"]>(initialValue);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = () => {
    setEditing(false);
    value !== initialValue && onChange?.(value);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    props.onBlur?.(event);
    handleChange();
  };
  const handleCancel = () => {
    setEditing(false);
    value !== initialValue && setValue(initialValue);
  };

  const handleKey: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    props.onKeyDown?.(event);
    switch (event.key) {
      case "Enter":
        return handleChange();
      case "Escape":
        return handleCancel();
      default:
        break;
    }
  };

  return editing ? (
    <TextField
      {...props}
      onKeyDown={handleKey}
      onBlur={handleBlur}
      value={value}
      onChange={setValue}
      autoFocus
      selectOnFocus
      size={size}
      //   className={cx(classes.common, classes.input, className)}
      classNames={{
        root: classes.inputWrapper,
        input: cx(classes.common, classes.input, className),
      }}
    />
  ) : (
    <Text
      {...textProps}
      onClick={() => !disabled && setEditing(true)}
      className={cx(classes.common, classes.text, className)}
    >
      {value}
    </Text>
  );
};

export default memo(EditableText);
