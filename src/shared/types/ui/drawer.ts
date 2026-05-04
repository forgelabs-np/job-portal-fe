import { Drawer as ChakraDrawer } from "@chakra-ui/react";

export type DrawerContentProps = ChakraDrawer.ContentProps & {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  offset?: ChakraDrawer.ContentProps["padding"];
};

export type DrawerProps = {
  open: boolean;
  onClose: () => void;

  title?: string;
  children: React.ReactNode;
  placement?: "top" | "start" | "end";

  hasHeader?: boolean;
  hasFooter?: boolean;
  hasCloseIcon?: boolean;
  hasCloseButton?: boolean;

  actionButtonText?: string;
  cancelButtonText?: string;
  actionIcon?: string;
  onAction?: VoidFunction;
  onEnd?: VoidFunction;
};
