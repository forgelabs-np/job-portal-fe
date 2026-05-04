"use client";

import { FormWrapperProps } from "@/shared/types";
import { Field } from "./Field";

export const FormWrapper = ({
  label,
  children,
  required,
  disabled,
  errorText,
}: FormWrapperProps) => {
  return (
    <Field
      label={label}
      invalid={!!errorText && !disabled}
      disabled={disabled}
      required={required}
      errorText={errorText}
    >
      {children}
    </Field>
  );
};
