import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import _ from "@lodash";
import {
  Box,
  Button,
  ButtonProps,
  clsx,
  ColProps,
  Divider,
  Grid,
  GridProps,
  Text,
} from "@mantine/core";
import FormField from "./FormField";
// types
import { PolymorphicComponentProps } from "@mantine/utils";
import { CommonProps, GridFormFieldsType, PlainFormFieldType } from "./types";

type BaseGridFormProps<T> = {
  customSubmit?: boolean;
  resetable?: boolean;
  gridProps?: GridProps;
  colProps?: ColProps;
  commonFieldProps?: CommonProps;
  buttonProps?: PolymorphicComponentProps<"button", ButtonProps>;
  submitWrapperProps?: ColProps;
  submitButtonProps?: PolymorphicComponentProps<"button", ButtonProps>;
  submitText?: React.ReactNode;
  resetWrapperProps?: ColProps;
  resetButtonProps?: PolymorphicComponentProps<"button", ButtonProps>;
  resetText?: React.ReactNode;
  extraFields?: Array<PlainFormFieldType<T>>;
};

export type GridFormProps<T extends FieldValues> = {
  fields: GridFormFieldsType<T>;
  parent?: Path<T>;
} & BaseGridFormProps<T>;

function GridForm<T extends FieldValues>({ parent, ...props }: GridFormProps<T>) {
  const { t } = useTranslation("common");

  const {
    setValue: setFieldValue,
    reset,
    formState: { isDirty, isValid, isSubmitting, isValidating },
  } = useFormContext();

  const setValue = (name: Path<T>, value: any) =>
    setFieldValue(name, value, {
      shouldValidate: true,
      shouldDirty: false,
      shouldTouch: false,
    });

  return (
    <Grid align="flex-start" gutter={8} {...props.gridProps}>
      {props.fields.map((field, index) =>
        "children" in field ? (
          <Grid.Col
            key={index}
            xs={12}
            {...props.colProps}
            {...field.wrapperProps}
            className={clsx(props.colProps?.className, field.wrapperProps?.className)}
          >
            <Box component="fieldset" {...field.groupWrapperProps}>
              <Text component="legend" {..._.merge({ sx: { mb: "1.6rem" } }, field.labelProps)}>
                {field.label}
              </Text>

              <GridForm
                {..._.omit(props, ["fields", "customSubmit"])}
                fields={field.children}
                customSubmit
                parent={
                  field.type === "group"
                    ? ((parent ? `${parent}.${field.name}` : field.name) as Path<T>)
                    : undefined
                }
              />
            </Box>
          </Grid.Col>
        ) : "type" in field && field.type === "divider" ? (
          <Divider key={index} my="xs" sx={{ width: "100%" }} {...field.props} />
        ) : (
          <Grid.Col
            key={index}
            xs={12}
            // {
            //   xs: 12,
            //   // sx: { "& > *": { width: "100%" } },
            // }
            {...props.colProps}
            {...field.wrapperProps}
            className={clsx(props.colProps?.className, field.wrapperProps?.className)}
          >
            <FormField
              field={field}
              setValue={setValue}
              commonFieldProps={props.commonFieldProps}
              parent={parent}
            />
          </Grid.Col>
        )
      )}
      {/* {formProps.hasSubmitErrors && !formProps.modifiedSinceLastSubmit && (
          <Grid item xs={12}>
            {errors?.non_field_errors?.map((err, idx) => (
              <Typography variant="body2" color="error">
                {err}
              </Typography>
            ))}
          </Grid>
        )} */}
      {!props.customSubmit && (
        <Grid.Col
          xs={12}
          {...props.colProps}
          {...props.submitWrapperProps}
          className={clsx(props.colProps?.className, props.submitWrapperProps?.className)}
        >
          <Button
            type="submit"
            color="primary"
            variant="filled"
            {...props.buttonProps}
            disabled={!isDirty || isSubmitting || isValidating || !isValid}
            {...props.submitButtonProps}
            loading={isSubmitting}
          >
            {props.submitText || t("actions.submit")}
          </Button>
        </Grid.Col>
      )}
      {props.resetable && (
        <Grid.Col
          xs={12}
          {...props.colProps}
          {...props.resetWrapperProps}
          className={clsx(props.colProps?.className, props.resetWrapperProps?.className)}
        >
          <Button
            type="button"
            variant="default"
            {...props.buttonProps}
            disabled={isSubmitting || !isDirty || isValidating}
            {...props.resetButtonProps}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              reset();
              props.resetButtonProps?.onClick?.(e);
            }}
          >
            {props.resetText || t("actions.reset")}
          </Button>
        </Grid.Col>
      )}

      {props.extraFields?.map((field, index) => (
        <FormField key={index} field={field} />
      ))}
    </Grid>
  );
}

// GridForm.propTypes = gridformProps;
// GridForm.defaultProps = {
//   gridProps: { alignItems: "flex-start", spacing: 2 },
//   submitText: "Submit",
//   resetText: "Reset",
// };

export default memo(GridForm) as typeof GridForm;
