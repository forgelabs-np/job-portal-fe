import React from "react";
import { Dialog as ChakraDialog, ConditionalValue } from "@chakra-ui/react";

export type DialogContentProps = ChakraDialog.ContentProps & {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
};

export type DialogProps = {
  title?: string;
  children: React.ReactNode;

  open: boolean;
  onClose: () => void;
  hasCloseTrigger?: boolean;
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full">;

  contentMinWidth?: ConditionalValue<string | number>;
};
