"use client";

import {
  Toaster as ChakraToaster,
  HStack,
  Portal,
  Spinner,
  Toast,
  createToaster,
} from "@chakra-ui/react";

import { CloseCircleIcon } from "@/assets/svg";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  duration: 4000,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }} px="12px">
            <HStack
              position="relative"
              justifyContent="space-between"
              flex="1"
              maxWidth="100%"
            >
              <HStack>
                {toast.type === "loading" ? (
                  <Spinner size="sm" color="blue.solid" />
                ) : (
                  <Toast.Indicator />
                )}
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              </HStack>

              <Toast.CloseTrigger position="relative" top={0} right={0}>
                <CloseCircleIcon
                  style={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
              </Toast.CloseTrigger>
            </HStack>
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
