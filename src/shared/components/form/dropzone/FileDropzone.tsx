"use client";

import React, { useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import {
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  IconButton,
  Circle,
} from "@chakra-ui/react";
import { LuCloudUpload, LuFile, LuX, LuCheck } from "react-icons/lu";

interface FileDropzoneProps {
  value: File | any | null;
  onChange: (file: File | null) => void;
  accept?: Accept;
  maxSize?: number;
  label?: string;
  placeholder?: string;
  error?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  value,
  onChange,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
    "application/pdf": [".pdf"],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  label,
  placeholder = "Drag & drop or click to upload",
  error,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const formatFileSize = (size: number) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Box width="100%">
      {label && (
        <Text fontSize="sm" fontWeight="semibold" mb={2}>
          {label}
        </Text>
      )}

      <Box
        {...getRootProps()}
        position="relative"
        p={6}
        border="2px dashed"
        borderColor={
          isDragActive
            ? "green.500"
            : isDragReject
              ? "red.500"
              : error
                ? "red.300"
                : "gray.200"
        }
        borderRadius="xl"
        bg={isDragActive ? "green.50" : "gray.50"}
        transition="all 0.2s"
        cursor="pointer"
        _hover={{
          borderColor: "green.400",
          bg: "gray.100",
        }}
      >
        <input {...getInputProps()} />

        {value ? (
          <HStack gap={4} width="100%" justify="space-between">
            <HStack gap={3}>
              <Circle
                size="10"
                bg={value instanceof File ? "green.100" : "blue.100"}
                color={value instanceof File ? "green.600" : "blue.600"}
              >
                <LuFile size={20} />
              </Circle>
              <VStack align="start" gap={0}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  maxWidth="200px"
                >
                  {value instanceof File
                    ? value.name
                    : value.documentType?.replace(/_/g, " ") || "Existing File"}
                </Text>
                <Text fontSize="xs" color={value.status === "REJECTED" ? "red.500" : value.status === "APPROVED" ? "green.500" : "gray.500"}>
                  {value instanceof File
                    ? formatFileSize(value.size)
                    : `Status: ${value.status || "Uploaded"}`}
                </Text>
              </VStack>
            </HStack>

            <HStack>
              {/* <Icon
                as={LuCheck}
                color={value instanceof File ? "green.500" : "blue.500"}
                size={"md"}
              /> */}
              <IconButton
                aria-label="Remove file"
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={removeFile}
                _hover={{ bg: "red.50" }}
              >
                <LuX />
              </IconButton>
            </HStack>
          </HStack>
        ) : (
          <VStack gap={3} py={2}>
            <Circle size="12" bg="white" boxShadow="sm" border="1px solid" borderColor="gray.100">
              <Icon
                as={LuCloudUpload}
                size={"md"}
                color={isDragActive ? "green.500" : "gray.400"}
              />
            </Circle>
            <VStack gap={1}>
              <Text fontSize="sm" fontWeight="bold" color="gray.700">
                {isDragActive ? "Drop the file here" : placeholder}
              </Text>
              <Text fontSize="xs" color="gray.500">
                PNG, JPG or PDF up to {formatFileSize(maxSize)}
              </Text>
            </VStack>
          </VStack>
        )}
      </Box>

      {error && (
        <Text color="red.500" fontSize="xs" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};
