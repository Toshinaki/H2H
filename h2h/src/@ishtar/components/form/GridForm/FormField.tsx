import React, { memo, useMemo } from "react";
import { FieldValues, Path, useController, useFormContext } from "react-hook-form";
import _ from "@lodash";
import { getFieldType } from "./utils";
import { CommonProps, FormFieldType, PlainFormFieldType } from "./types";

type NamedFormFieldProps<T extends FieldValues> = {
  field: FormFieldType<T>;
  commonFieldProps?: CommonProps;
  setValue?: (name: Path<T>, value: any) => void;
  parent?: Path<T>;
};

function NamedFormField<T extends FieldValues>({
  field: rawField,
  parent,
  setValue,
  commonFieldProps,
}: NamedFormFieldProps<T>) {
  const fieldName = useMemo(
    () => (parent ? `${parent}.${rawField.name}` : rawField.name) as Path<T>,
    [parent, rawField]
  );
  const Field = useMemo(() => getFieldType(rawField.type) || rawField.Field, [rawField]);

  const {
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const {
    field, //: { onChange, onBlur, name, value, ref }
    fieldState: { isTouched, isDirty, error },
  } = useController({ name: fieldName, control });

  const value = useMemo(
    () =>
      // field.value && "type" in rawField && rawField.type === "date"
      //   ? new Date(field.value as string)
      //   : field.value,
      field.value,
    // [field.value, rawField]
    [field.value]
  );

  // dynamic props, based on other field value (or self)
  const dynamicProps = rawField.dynamicProps
    ? Object.entries(rawField.dynamicProps).reduce(
        (acc, [prop, { usekey, func }]) => ({
          ...acc,
          [prop]: func?.(watch(usekey), _.get(errors, usekey)) || watch(usekey),
        }),
        {}
      )
    : {};

  const renderProps = _.merge(
    { disabled: rawField.props?.disabled || isSubmitting || false },
    commonFieldProps,
    dynamicProps,
    rawField.props,
    { setValue: setValue ? (value: any) => setValue(fieldName, value) : undefined },
    field,
    { error: error?.message, isTouched, isDirty, value }
  );
  return (

    (rawField.usekey
      ? rawField.render?.(
          renderProps,
          watch((rawField.usekey || renderProps.name) as Path<T>),
          _.get(errors, (rawField.usekey || renderProps.name) as Path<T>)
        )
      : rawField.render?.(renderProps)) ||
    (Field ? (
      <Field {...renderProps} />
    ) : rawField.field ? (
      React.cloneElement(rawField.field, {
        ...renderProps,
        ...rawField.field.props,
        value,
      })
    ) : null)
  );
}

type PlainFormFieldProps<T extends FieldValues> = {
  field: PlainFormFieldType<T>;
  commonFieldProps?: CommonProps;
};

function PlainFormField<T extends FieldValues>({
  field: rawField,
  commonFieldProps,
}: PlainFormFieldProps<T>) {
  const {
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();

  // dynamic props, based on other field value (or self)
  const dynamicProps = useMemo(
    () =>
      rawField.dynamicProps
        ? Object.entries(rawField.dynamicProps).reduce(
            (acc, [prop, { usekey, func }]) => ({
              ...acc,
              [prop]: func?.(watch(usekey), _.get(errors, usekey)) || watch(usekey),
            }),
            {}
          )
        : {},
    [errors, rawField.dynamicProps, watch]
  );

  const renderProps = _.merge({ disabled: isSubmitting || false }, commonFieldProps, dynamicProps);

  return (
    (rawField.usekey
      ? rawField.render?.(
          renderProps,
          watch(rawField.usekey as Path<T>),
          _.get(errors, rawField.usekey as Path<T>)
        )
      : rawField.render?.(renderProps)) ||
    (rawField.field
      ? React.cloneElement(rawField.field, {
          ...renderProps,
          ...rawField.field.props,
        })
      : null)
  );
}

export type FormFieldProps<T extends FieldValues> = PlainFormFieldProps<T> | NamedFormFieldProps<T>;

function FormField<T extends FieldValues>({ field, ...props }: FormFieldProps<T>) {
  return "name" in field ? (
    <NamedFormField field={field} {...props} />
  ) : (
    <PlainFormField field={field} {...props} />
  );
}

export default memo(FormField) as typeof FormField;
