import { useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import { Button, Grid, Text, VStack } from "@chakra-ui/react";

import { DropzoneProps } from "@/shared/types";

import { MultiFilePreview, SingleFilePreview } from "./Preview";
import { CloudAddIcon } from "@/assets/svg";

export const Dropzone = ({ name, multiple }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const { value, onChange } = field;

  // this resets the input so onDrop is triggered even when selecting the same file
  const resetInput = () => {
    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.value = "";
    }
  };

  // function to control the file change
  const onDrop = (acceptedFiles: File[]) => {
    if (multiple) {
      const previousValues = Array.isArray(value)
        ? value?.map((file) => file)
        : [];

      onChange([...previousValues, ...acceptedFiles]);
    } else {
      const uploadedFile = acceptedFiles?.[0];
      onChange(uploadedFile);
    }

    resetInput();
  };

  // remove file in case of single upload
  const removeSingleFile = () => {
    onChange();
  };

  // remove file in case of multiple upload
  const removeMultipleFiles = (deleteIndex: number) => {
    if (Array.isArray(value)) {
      const filteredValues = value?.filter((_, index) => index !== deleteIndex);
      onChange(filteredValues);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
  });

  const errorMessage = errors?.[name]?.message as string;

  return (
    <VStack alignItems="stretch" width="full" gap={6}>
      <Grid
        {...(getRootProps() as Omit<DropzoneRootProps, "color">)}
        position="relative"
        placeItems="center"
        width="full"
        borderRadius={"lg"}
        border={"2px dashed #e5e5e5"}
        height={{ base: "300px", md: "200px" }}
        padding={"31px"}
        bg="white"
        py={{ base: 5, md: 3 }}
      >
        <input ref={inputRef} {...getInputProps()} />
        <CloudAddIcon />
        <Text
          fontSize={"sm"}
          fontWeight={"semibold"}
          color={"gray.900"}
          mt={4}
          mb={1}
        >
          Choose a file or drag & drop it here
        </Text>
        <Text fontSize={"sm"} color={"#5c5c5c"} mb={4}>
          JPEG, PNG, PDG, and MP4 formats, up to 50MB
        </Text>
        <Button
          variant={"outline"}
          borderColor={"#CBD0DC"}
          color={"gray.900"}
          size={"sm"}
        >
          Browse Files
        </Button>
      </Grid>

      {value ? (
        multiple ? (
          <MultiFilePreview value={value} onRemove={removeMultipleFiles} />
        ) : (
          <SingleFilePreview value={value} onRemove={removeSingleFile} />
        )
      ) : undefined}

      {errorMessage && (
        <Text fontSize="sm" color="red.500" mt={1}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};
