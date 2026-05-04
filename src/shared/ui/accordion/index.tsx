import * as React from "react";
import { LuChevronDown } from "react-icons/lu";
import { Accordion, Box, HStack } from "@chakra-ui/react";

import { AddIcon, SubtractIcon } from "@/assets/svg";
import { ExtendedAccordionItemTriggerProps } from "@/shared/types";

type AccordionItemTriggerProps = React.ComponentProps<
  typeof Accordion.ItemTrigger
> &
  ExtendedAccordionItemTriggerProps;

export const AccordionItemTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionItemTriggerProps
>(function AccordionItemTrigger(
  {
    children,
    isOpen,
    hasAccordionIcon = true,
    indicatorPlacement = "end",
    hasCustomIcon,
    ...rest
  },
  ref
) {
  return (
    <Accordion.ItemTrigger {...rest} ref={ref}>
      <HStack
        alignItems="stretch"
        gap="4"
        flex="1"
        textAlign="start"
        width="full"
      >
        {children}
      </HStack>

      {hasAccordionIcon && indicatorPlacement === "end" && (
        <Accordion.ItemIndicator>
          {hasCustomIcon ? (
            isOpen ? (
              <Box ml={4}>
                <SubtractIcon />
              </Box>
            ) : (
              <Box mr={4}>
                <AddIcon />
              </Box>
            )
          ) : (
            <LuChevronDown />
          )}
        </Accordion.ItemIndicator>
      )}
    </Accordion.ItemTrigger>
  );
});

export const AccordionItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.ItemContent>
>(function AccordionItemContent(props, ref) {
  return (
    <Accordion.ItemContent ref={ref}>
      <Accordion.ItemBody {...props} />
    </Accordion.ItemContent>
  );
});

export const AccordionRoot = Accordion.Root;
export const AccordionItem = Accordion.Item;
