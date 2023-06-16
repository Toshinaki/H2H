// import RHFDatePicker, { RHFDatePickerProps } from "./components/DatePicker";
import RHFRadios, { RHFRadiosProps } from "./components/Radios";
import RHFSwitch, { RHFSwitchProps } from "./components/Switch";
import RHFTextInput, { RHFTextInputProps } from "./components/TextInput";
import RHFNumberInput, { RHFNumberInputProps } from "./components/NumberInput";
import { FieldType, GridFormFieldsType } from "./types";

export const getFieldType = (type: Omit<FieldType, "group">): React.ElementType | null => {
  switch (type) {
    // case "date":
    //   return RHFDatePicker;
    case "text":
    case "email":
      return RHFTextInput;
    case "number":
      return RHFNumberInput;
    // case "multiline":
    //   return RHFTextArea;
    case "radios":
      return RHFRadios;
    case "switch":
      return RHFSwitch;
    default:
      return null;
  }
};

export type RenderFieldProps =
  // | RHFDatePickerProps
  | RHFTextInputProps
  | RHFNumberInputProps
  // | RHFTextAreaProps
  | RHFRadiosProps
  | RHFSwitchProps;

export const buildDefaults = <T>(fields: GridFormFieldsType<T>) => {
  let result: { [key: string]: any } = {};
  fields.forEach((field) => {
    if ("children" in field) {
      if ("name" in field) {
        result[field.name] = buildDefaults(field.children);
      } else {
        result = { ...result, ...buildDefaults(field.children) };
      }
    } else if ("name" in field) {
      result[field.name] = "";
    }
  });
  return result;
};
