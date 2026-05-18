import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { SidebarItemProps } from "@/shared/types";
import Link from "next/link";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/shared";
import { usePathname } from "next/navigation";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { MdKeyboardArrowDown } from "react-icons/md";

const LinkItemContent = ({
  name,
  icon,
  isChild,
  isActive,
  collapsed,
  hasSubItems,
}: SidebarItemProps & { hasSubItems?: boolean }) => (
  <Flex
  align="center"
      gap={6}
      px={collapsed ? "0" : "5"}
      py="2.5"
      mx="2"
      borderRadius="10px"
      cursor="pointer"
      justify={collapsed ? "center" : "flex-start"}
      transition="all 0.2s ease"
      position="relative"
      bg={isActive ? "#b6e5d2" : "transparent"}
      color={isActive ? WEBSITE_THEME_COLOR : "gray.700"}
      fontWeight={isActive ? "600" : "400"}
      _hover={{
        bg: isActive ? "#b6e5d2" : "#08b36e",
        color: "white",
        transform: "translateX(2px)",
      }}
      css={{
        "&::before": isActive
          ? {
            content: '""',
            position: "absolute",
            left: "-8px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: "60%",
            background: "white",
            borderRadius: "0 4px 4px 0",
          }
          : {},
      }}
  >
    <Flex align="center" gap={1} minW={0}>
      {/* Child line indicator */}
      {isChild && (
        <Box
          position="absolute"
          left="-10px"
          top="50%"
          transform="translateY(-50%)"
          width="6px"
          height="6px"
          borderRadius="full"
          bg={isActive ? WEBSITE_THEME_COLOR : "gray.400"}
        />
      )}

      <Box
        css={{
          "& > svg": {
            width: isChild ? "16px" : "18px",
            height: isChild ? "16px" : "18px",
          },
        }}
        opacity={isActive ? 1 : 0.8}
      >
        {icon}
      </Box>

      {!collapsed && (
        <Text
          fontSize={isChild ? "sm" : "md"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {name}
        </Text>
      )}
    </Flex>

    {!collapsed && hasSubItems && (
      <MdKeyboardArrowDown size={18} />
    )}
  </Flex>
);

export const LinkItem = ({
  name,
  href,
  icon,
  isChild,
  collapsed,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  const content = (
    <LinkItemContent
      name={name}
      icon={icon}
      isChild={isChild}
      isActive={active}
      collapsed={collapsed}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        style={{
          width: "100%",
          display: "block",
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export const SidebarItem = (props: SidebarItemProps) => {
  const pathname = usePathname();

  const hasSubItems = Array.isArray(props.subItems);

  const isParentActive = props.subItems?.some(
    (item) => item.href === pathname
  );

  return (
    <AccordionItem value={props.name} border="none">
      <AccordionItemTrigger px="0" py="0" hasAccordionIcon={false}>
        <Box width="full">
          <LinkItemContent
            {...props}
            isActive={isParentActive}
            hasSubItems={hasSubItems}
          />
        </Box>
      </AccordionItemTrigger>

      {hasSubItems && (
        <AccordionItemContent pt={2} pb={1}>
          <Box
            ml={6}
            pl={4}
            borderLeft="1px solid"
            borderColor="gray.200"
          >
            <VStack align="stretch" gap={1}>
              {props.subItems?.map((subItem) => (
                <LinkItem
                  key={subItem.menuName}
                  name={subItem.menuName ?? ""}
                  {...subItem}
                  isChild
                  collapsed={props.collapsed}
                />
              ))}
            </VStack>
          </Box>
        </AccordionItemContent>
      )}
    </AccordionItem>
  );
};