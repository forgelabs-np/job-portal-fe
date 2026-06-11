"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input as ChakraInput, Box } from "@chakra-ui/react";
import { CalendarIcon } from "lucide-react";

import { FormWrapper } from "../wrapper";
import { TextFieldInputProps } from "@/shared/types";

export const DateFieldInput: React.FC<TextFieldInputProps> = ({
  label,
  name,
  required,
  disabled,
  borderColor,
  borderRadius,
  placeholder = "Select date",
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
  });

  const errorText = errors?.[name]?.message as string;

  return (
    <FormWrapper
      label={label}
      required={required}
      disabled={disabled}
      errorText={errorText}
      borderColor={borderColor}
      borderRadius={borderRadius}
    >
      <Box position="relative" width="100%" css={{
        ".react-datepicker-wrapper": {
          display: "block",
          width: "100%",
        },
        ".react-datepicker__input-container": {
          display: "block",
          width: "100%",
        },
        ".react-datepicker__triangle": {
          display: "none",
        },
        ".react-datepicker": {
          fontFamily: "inherit",
          border: `1px solid var(--chakra-colors-gray-200, #e2e8f0)`,
          borderRadius: "md",
          boxShadow: "sm",
        },
        ".react-datepicker__header": {
          backgroundColor: "white",
          borderBottom: `1px solid var(--chakra-colors-gray-200, #e2e8f0)`,
        },
        ".react-datepicker__day--selected": {
          backgroundColor: "var(--chakra-colors-blue-600, #2b6cb0)",
          color: "white",
        },
        ".react-datepicker__day:hover": {
          backgroundColor: "var(--chakra-colors-gray-100, #edf2f7)",
        },
        ".react-datepicker__day--keyboard-selected": {
          backgroundColor: "var(--chakra-colors-blue-500, #3182ce)",
          color: "white",
        }
      }}>
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => onChange(date ? date.toISOString().split("T")[0] : null)}
          onBlur={onBlur}
          disabled={disabled}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          placeholderText={placeholder as string}
          dateFormat="yyyy-MM-dd"
          customInput={
            <ChakraInput
              id={name}
              borderColor={borderColor}
              rounded={borderRadius}
              width="100%"
              pl="10"
              {...rest}
            />
          }
        />
        <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" pointerEvents="none" color="gray.500">
          <CalendarIcon size={16} />
        </Box>
      </Box>
    </FormWrapper>
  );
};
