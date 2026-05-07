"use client";

import { useController, useFormContext } from "react-hook-form";
import { Switch, HStack, Text } from "@chakra-ui/react";
import { FormWrapper } from "../wrapper";

interface SwitchFieldInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

export const SwitchFieldInput: React.FC<SwitchFieldInputProps> = ({
  name,
  label,
  disabled,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  const errorText = errors?.[name]?.message as string;

  return (
    <FormWrapper
      label={label}
      required={required}
      disabled={disabled}
      errorText={errorText}
    >
      <HStack>
        <Switch.Root
          checked={!!value}
          onCheckedChange={(e) => onChange(e.checked)}
          disabled={disabled}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>

        <Text>{value ? "Yes" : "No"}</Text>
      </HStack>
    </FormWrapper>
  );
};
