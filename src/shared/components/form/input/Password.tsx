"use client";

import { KeyboardEvent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Grid, useDisclosure } from "@chakra-ui/react";

import { TextFieldInput } from "./TextField";
import { PasswordInputProps } from "@/shared/types";
import { EyeCloseIcon, EyeOpenIcon } from "@/assets/svg";

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const { open, onToggle } = useDisclosure();

  const { control } = useFormContext();

  const { field } = useController({
    control,
    name: props.name,
  });

  // toggle the eye icon when space or enter is pressed on that element
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onToggle();
    }
  };

  const isIconVisible = field.value?.length > 0;

  return (
    <TextFieldInput
      {...props}
      placeholder={props.placeholder ?? "********"}
      type={open ? "text" : "password"}
      autoComplete="new-password"
      // endElement={
      //   isIconVisible && (
      //     <Grid
      //       flexShrink={0}
      //       placeItems="center"
      //       boxSize="47px"
      //       cursor="pointer"
      //       tabIndex={0}
      //       onClick={onToggle}
      //       onKeyDown={handleKeyDown}
      //     >
      //       {open ? <EyeCloseIcon /> : <EyeOpenIcon />}
      //     </Grid>
      //   )
      // }
    />
  );
};
