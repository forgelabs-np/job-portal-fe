import React from "react";

export type TextFieldInputProps = {
  type?: "text" | "password" | "tel";
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  autoComplete?: string;
  borderColor?: string;
  borderRadius?:string;
  inputRef?: React.Ref<HTMLInputElement>;
  width?: string;
};
