import {
  BoxProps,
  ColProps,
  DividerProps,
  InputVariant,
  MantineSize,
  TextProps,
} from "@mantine/core";
import { Path } from "react-hook-form";
import { PolymorphicComponentProps } from "@mantine/utils";
import { DeepKeyof, ExtendedColorType, Override } from "types";
import { RHFRadiosProps } from "./components/Radios";
import { RHFSwitchProps } from "./components/Switch";
import { RHFTextInputProps } from "./components/TextInput";
import { RHFNumberInputProps } from "./components/NumberInput";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "multiline"
  | "date"
  | "checkbox"
  | "checkboxes"
  | "radios"
  | "switch"
  | "switches"
  | "autocomplete"
  | "select"
  | "group"
  | "plaingroup"
  | "divider";

export type FormDividerType = {
  type: "divider";
  props?: DividerProps;
};
export type FormPlainGroupType<T> = {
  type: "plaingroup";
  label: React.ReactNode;
  labelProps?: PolymorphicComponentProps<"legend", TextProps>;
  children: Array<FormFieldType<T> | PlainFormFieldType<T> | FormDividerType>;
  wrapperProps?: ColProps;
  groupWrapperProps?: PolymorphicComponentProps<"fieldset", BoxProps>;
};

export type PlainFormFieldType<T> = {
  field?: React.ReactElement;
  Field?: React.ElementType;
  render?: (props: any, value?: any, errors?: any) => JSX.Element;
  usekey?: Path<T>;
  dynamicProps?: { [prop: string]: { usekey: Path<T>; func?: (value: any, error: any) => any } };
  wrapperProps?: ColProps;
};

export type FormFieldType<T> = Override<
  PlainFormFieldType<T>,
  {
    name: DeepKeyof<T, 2>; // field name; required for form fields, not for other elements
    // type: Exclude<FieldType, "group" | "divider">; // field element type name // TODO oneof
    // props?: RenderPropsMap[F]; // props for the field; inputProps < props < field.props
  } & ( // | { type: "date"; props?: RHFDatePickerProps }
    | { type: "text"; props?: RHFTextInputProps }
    | { type: "email"; props?: RHFTextInputProps }
    | { type: "number"; props?: RHFNumberInputProps }
    // | { type: "multiline"; props?: RHFTextAreaProps }
    | { type: "radios"; props?: RHFRadiosProps }
    | { type: "switch"; props?: RHFSwitchProps }
  )
>;

export type GroupFormFieldType<T> = Override<
  FormFieldType<T>,
  {
    name: Path<T>;
    type: "group";
    label: React.ReactNode;
    labelProps?: PolymorphicComponentProps<"legend", TextProps>;
    groupWrapperProps?: PolymorphicComponentProps<"fieldset", BoxProps>;
    children: Array<FormFieldType<T> | PlainFormFieldType<T> | FormDividerType>;
  }
>;

export type GridFormFieldsType<T> = Array<
  | FormFieldType<T>
  | PlainFormFieldType<T>
  | GroupFormFieldType<T>
  | FormPlainGroupType<T>
  | FormDividerType
>;

export type CommonProps = {
  autoComplete?: string;
  size?: MantineSize;
  variant?: InputVariant;
  color?: ExtendedColorType;
  required?: boolean;
};

export type CommonFieldProps = CommonProps & {
  setValue?: (value: any) => void;
  isDirty?: boolean;
  isTouched?: boolean;
};
