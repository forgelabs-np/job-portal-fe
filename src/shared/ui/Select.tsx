"use client";

import { NativeSelect } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../components/form/wrapper";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldInputProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}

export function SelectFieldInput({
  name,
  label,
  options,
  placeholder = "Select an option",
  required,
}: SelectFieldInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field
      label={label}
      required={required}
      errorText={errors[name]?.message as string}
      invalid={!!errors[name]}
    >
      <NativeSelect.Root>
        <NativeSelect.Field {...register(name)} required={required}>
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field>
  );
}
