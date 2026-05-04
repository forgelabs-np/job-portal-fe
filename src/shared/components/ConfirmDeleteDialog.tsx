import React from "react";
import {
  Button,
  Text,
  Stack,
  Box,
  Flex,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogBackdrop,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading,
}) => {
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <DialogBackdrop
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        zIndex={9999}
      />
      <DialogContent
        maxW="420px"
        mx={4}
        my="auto"
        bg="white"
        shadow="2xl"
        rounded="xl"
        border="1px"
        borderColor="gray.200"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={10000}
      >
        <DialogHeader pb={3}>
          <Flex align="center" gap={3} position="relative">
            <Box
              p={2}
              rounded="full"
              bg="red.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiTrash2 color="red" size={22} />
            </Box>
            <Text fontSize="lg" fontWeight="semibold" color="red.600">
              {title}
            </Text>
            <DialogCloseTrigger position="absolute" right={-2} top={-2} />
          </Flex>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <Text fontSize="sm" color="gray.700">
              {description}
            </Text>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" mr={3} onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button colorPalette="red" onClick={onConfirm} loading={loading}>
            <FiTrash2 style={{ marginRight: 6 }} /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmDeleteDialog;
