import { memo } from "react";
import TextField, { TextFieldProps } from "../../components/TextField";
import { Override } from "types";
import { CommonFieldProps } from "../types";

export type RHFTextInputProps = Override<CommonFieldProps, TextFieldProps>;

const RHFTextInput = ({
  setValue,
  isDirty,
  isTouched,
  ...props
}: RHFTextInputProps): JSX.Element => {
  return <TextField {...props} />;
};

export default memo(RHFTextInput);
