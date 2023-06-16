import { memo, useImperativeHandle } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReset,
  UseFormSetError,
} from "react-hook-form";
import _ from "@lodash";
import { buildDefaults } from "./utils";
import { Paper, PaperProps } from "@mantine/core";
import GridForm, { GridFormProps } from "./GridForm";

export type RHFGridFormRef<T extends FieldValues> = {
  reset: UseFormReset<T>;
  setError: UseFormSetError<T>;
} | null;

export type RHFGridFormProps<T extends FieldValues> = {
  id?: string;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  paperProps?: PaperProps;
} & Omit<GridFormProps<T>, "parent"> &
  Partial<UseFormProps<T>>;

function RHFGridForm<T extends FieldValues>({
  formRef,
  ...props
}: RHFGridFormProps<T> & { formRef?: React.Ref<RHFGridFormRef<T>> }) {
  const {
    id = "react-hook-grid-form",
    mode = "onChange",
    defaultValues,
    resolver,
    onSubmit,
    onError = console.warn,
    paperProps,
    ...rest
  } = props;

  // const { handleSubmit, formState, ...formProps } = useForm<T>({
  //   mode,
  //   defaultValues: _.merge({}, buildDefaults(props.fields), defaultValues),
  //   resolver,
  // });

  const form = useForm<T>({
    mode,
    defaultValues: _.merge({}, buildDefaults(props.fields), defaultValues),
    resolver,
  });

  useImperativeHandle(formRef, () => ({
    reset: form.reset,
    setError: form.setError,
  }));

  const submit = form.handleSubmit((data) => onSubmit(data), onError);
  // console.log(formProps.watch());
  // console.log(formState.errors);
  return (
    <FormProvider {...form}>
      <Paper component="form" id={id} noValidate onSubmit={submit} {...paperProps}>
        <GridForm {...rest} />
      </Paper>
    </FormProvider>
  );
}

export default memo(RHFGridForm) as typeof RHFGridForm;
