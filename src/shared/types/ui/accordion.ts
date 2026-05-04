import { Accordion } from "@chakra-ui/react";

export type AccordionItemTriggerProps = Accordion.ItemTriggerProps & {
  indicatorPlacement?: "start" | "end";
  hasAccordionIcon?: boolean;
};

export type ExtendedAccordionItemTriggerProps = {
  isOpen?: boolean;
  hasAccordionIcon?: boolean;
  indicatorPlacement?: "start" | "end";
  hasCustomIcon?: boolean;
};
