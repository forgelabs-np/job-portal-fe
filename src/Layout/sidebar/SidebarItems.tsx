import { Box, HStack, Text } from "@chakra-ui/react";

import { SidebarItemProps } from "@/shared/types";
import Link from "next/link";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/shared";
import { usePathname } from "next/navigation";

const LinkItemContent = ({
  name,
  icon,
  isChild,
  isActive,
  collapsed,
}: SidebarItemProps) => (
  <HStack
    as="div"
    px="6"
    py="2"
    pl={isChild ? "8" : undefined}
    userSelect="none"
    width="full"
    justifyContent={collapsed ? "center" : "flex-start"}
    _hover={{
      background: !isActive ? "gray.200" : undefined,
    }}
    background={isActive ? "green.600" : undefined}
    color={isActive ? "white" : "gray.700"}
  >
    <Box
      css={{
        "&>svg": {
          width: 5,
          height: 5,
        },
      }}
    >
      {icon}
    </Box>

    {!collapsed && <Text>{name}</Text>}
  </HStack>
);

export const LinkItem = ({
  name,
  href,
  icon,
  isChild,
  isActive,
  collapsed,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  if (href) {
    return (
      <Link
        href={href}
        style={{
          width: "100%",
        }}
      >
        <LinkItemContent
          name={name}
          icon={icon}
          isChild={isChild}
          isActive={active}
          collapsed={collapsed}
        />
      </Link>
    );
  }

  return (
    <LinkItemContent
      name={name}
      icon={icon}
      isChild={isChild}
      isActive={active}
      collapsed={collapsed}
    />
  );
};

export const SidebarItem = (props: SidebarItemProps) => {
  const subItems = props.subItems;

  const hasSubItems = Array.isArray(subItems);

  return (
    <AccordionItem value={props.name} borderWidth="0">
      <AccordionItemTrigger
        hasAccordionIcon={hasSubItems}
        py="0"
        cursor="pointer"
      >
        <LinkItem {...props} />
      </AccordionItemTrigger>

      {hasSubItems && (
        <AccordionItemContent py="0">
          {props.subItems?.map((subItem) => (
            <LinkItem
              name={subItem.menuName ?? ""}
              key={subItem.menuName}
              {...subItem}
              isChild
              collapsed={props.collapsed}
            />
          ))}
        </AccordionItemContent>
      )}
    </AccordionItem>
  );
};
