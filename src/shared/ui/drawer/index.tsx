import * as React from "react";
import {
  Box,
  Button,
  Drawer as ChakraDrawer,
  Flex,
  Portal,
} from "@chakra-ui/react";

import { CloseCircleIcon } from "@/assets/svg";

import { CloseButton } from "../button";
import { DrawerContentProps, DrawerProps } from "@/shared/types";

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, offset, ...rest } = props;
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDrawer.Positioner padding={offset}>
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  );
});

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDrawer.CloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawer.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawer.CloseTrigger>
  );
});

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;

export const Drawer = ({
  open,
  onClose,
  title,
  children,
  placement = "end",
  hasHeader = true,
  hasFooter = true,
  hasCloseIcon = true,
  hasCloseButton = true,
  actionButtonText = "Save",
  cancelButtonText = "Cancel",
  onAction,
}: DrawerProps) => {
  return (
    <DrawerRoot
      open={open}
      onOpenChange={onClose}
      closeOnEscape
      placement={placement}
      lazyMount
    >
      <DrawerBackdrop />
      <DrawerContent
        style={{
          animationDuration: "0.3s",
          animationTimingFunction: "ease",
        }}
      >
        {hasHeader && (
          <DrawerHeader>
            <DrawerTitle>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Box>{title}</Box>
                {hasCloseButton && (
                  <DrawerActionTrigger asChild>
                    <CloseCircleIcon color="red" cursor={"pointer"} />
                  </DrawerActionTrigger>
                )}
              </Flex>
            </DrawerTitle>
          </DrawerHeader>
        )}

        <DrawerBody padding="0">{children}</DrawerBody>

        {hasFooter && (
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">{cancelButtonText}</Button>
            </DrawerActionTrigger>
            <Button onClick={onAction}>{actionButtonText}</Button>
          </DrawerFooter>
        )}

        {hasCloseIcon && <DrawerCloseTrigger />}
      </DrawerContent>
    </DrawerRoot>
  );
};
