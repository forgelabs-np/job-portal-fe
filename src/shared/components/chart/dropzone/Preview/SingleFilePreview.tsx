import { Box, HStack, Text, VStack, Image } from "@chakra-ui/react";

// import { CloseIcon, PdfIcon } from "@/shared/assets";
import { SingleFilePreviewProps } from "@/shared/types";
// import { AddWorkspaceIcon } from "@/features";

export const SingleFilePreview = ({
  value,
  fileName,
  onRemove,

  dateTime,
}: SingleFilePreviewProps) => {
  if (!fileName) {
    fileName = typeof value === "string" ? value : value?.name;
  }

  const fileType = typeof value === "object" ? value.type : null;
  const isImage = fileType?.startsWith("image/");
  const isPDF = fileType === "application/pdf";

  const previewUrl =
    isImage && typeof value !== "string" ? URL.createObjectURL(value) : null;

  return (
    <HStack
      justifyContent="space-between"
      px="5"
      py="4"
      bg="white"
      fontSize="sm"
      gap={4}
      rounded={"xl"}
      shadow={"0px 1px 3px 0px #0000001A"}
      pos={"relative"}
      w="full"
    >
      <Box w="50px" h="50px" flexShrink={0}>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            w="full"
            h="full"
            objectFit="cover"
            rounded="md"
          />
        )}
      </Box>

      {/* File info */}
      <VStack alignItems={"start"} flex={1} minW={0}>
        <Text color={"gray.800"} w="full">
          {fileName}
        </Text>
        <Text color={"gray.400"}>
          {dateTime ||
            (typeof value === "object" && value.size
              ? `${(value.size / 1024).toFixed(2)} KB`
              : null)}
        </Text>
      </VStack>

      {/* Remove button */}
      <Box
        bg={"system.background.danger"}
        rounded={"full"}
        color={"bg.error"}
        onClick={onRemove}
        height={"20px"}
        width={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        pos={"absolute"}
        right={"-6px"}
        top={"-6px"}
        cursor={"pointer"}
        _hover={{ transform: "scale(1.1)" }}
        transition="transform 0.2s"
      >
        {/* <CloseIcon className="close-icon" height={"14px"} width={"14px"} /> */}
      </Box>
    </HStack>
  );
};
