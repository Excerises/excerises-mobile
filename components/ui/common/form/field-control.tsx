import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormGroup, { FormGroupProps } from "../form-group";
import FieldError from "./field-error";

export type FieldControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues,
> = ControllerProps<TFieldValues, TName, TTransformedValues> &
  Omit<FormGroupProps, "children">;

export default function FieldControl<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  label,
  render,
  ...others
}: FieldControlProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      {...others}
      render={({ field, fieldState, formState }) => (
        <FormGroup label={label}>
          {render({ field, fieldState, formState })}
          {fieldState.error && (
            <FieldError errors={[fieldState.error!.message || ""]} />
          )}
        </FormGroup>
      )}
    ></Controller>
  );
}
