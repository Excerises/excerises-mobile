import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { FormGroup } from "./group";
import { Label } from "./label";
import { Text } from "..";

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControllerProps<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  required?: boolean;
};

export function FormControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  label,
  required,
  render,
  ...props
}: FormControlProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      render={(renderProps) => (
        <FormGroup>
          {label && <Label required={required}>{label}</Label>}
          {render(renderProps)}
          {renderProps.fieldState.invalid && (
            <Text size="sm" variant="destructive">
              {renderProps.fieldState.error?.message}
            </Text>
          )}
        </FormGroup>
      )}
      {...props}
    ></Controller>
  );
}
