import React from "react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogBackdrop,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { BRAND_COLORS } from "@/constants/color";

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  isOpen,
  onClose,
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
        backdropFilter="blur(2px)"
        zIndex={999}
      />
      <DialogContent
        maxW="400px"
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
        zIndex={999}
      >
        <DialogHeader pb={3}>
          <Flex align="center" justify="space-between" position="relative">
            <Text fontSize="lg" fontWeight="semibold" color={BRAND_COLORS[600]}>
              Change Password
            </Text>
            <DialogCloseTrigger position="absolute" right={-2} top={-2} />
          </Flex>
        </DialogHeader>
        <DialogBody>
          <ChangePasswordForm onClose={onClose} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default ChangePasswordDialog;
