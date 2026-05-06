import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { ROUTES } from "@/constants/routes";
import { getInitialExpandedSidebarMenu } from "@/utils/layout";
import { AccordionRoot } from "@/shared";
import { SidebarItem } from "./SidebarItems";
import { GlobeIcon } from "../Footer";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { MdDashboard } from "react-icons/md";
import { BsHouse } from "react-icons/bs";

export const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    href: ROUTES.ADMIN_DASHBOARD,
    icon: <MdDashboard />,
  },
  {
    name: "Agency Network",
    href: ROUTES.AGENCY_NETWORK,
    icon: <BsHouse />,
  },
  //   {
  //     name: "User Management",
  //     href: ROUTES_CONFIG.USER.USER_MANAGEMENT,
  //     icon: <ChartIcon />,
  //   },
  //   {
  //     name: "My Files",
  //     href: ROUTES_CONFIG.USER.MY_FILES,
  //     icon: <FormIcon />,
  //   },
  //   {
  //     name: "Shared With Me",
  //     href: ROUTES_CONFIG.USER.SHARED_WITH_ME,
  //     icon: <ChartIcon />,
  //   },
  //   {
  //     name: "Folder",
  //     href: ROUTES_CONFIG.USER.FOLDER,
  //     icon: <FormIcon />,
  //   },
  //   {
  //     name: "Case Type Setup",
  //     href: ROUTES_CONFIG.USER.CASE_TYPE_SETUP,
  //     icon: <ChartIcon />,
  //   },
  //   {
  //     name: "Office Setup",
  //     href: ROUTES_CONFIG.USER.OFFICE_SETUP,
  //     icon: <FormIcon />,
  //   },
  //   {
  //     name: "Archive",
  //     href: ROUTES_CONFIG.USER.ARCHIVE,
  //     icon: <ChartIcon />,
  //   },

  // use this format in case of nested
  // {
  //   name: "Datatable",
  //   icon: <TableIcon />,
  //   parent: ROUTES_CONFIG.DATATABLE.DEFAULT,
  //   subItems: [
  //     {
  //       name: "Basic Datatable",
  //       href: ROUTES_CONFIG.DATATABLE.BASIC,
  //       icon: <TableIcon />,
  //     },
  //     {
  //       name: "Dynamic Datatable",
  //       href: ROUTES_CONFIG.DATATABLE.DYNAMIC,
  //       icon: <TableIcon />,
  //     },
  //   ],
  // },
];

export const Sidebar = () => {
  const [value, setValue] = useState(getInitialExpandedSidebarMenu);

  return (
    <VStack
      alignItems="stretch"
      flexShrink="0"
      gap="4"
      borderRight="sm"
      borderRightColor="gray.200"
      width="64"
      py="6"
    >
      <Flex align="center" gap={2.5} flexShrink={0} px={4}>
        <Box
          w="36px"
          h="36px"
          bg={WEBSITE_THEME_COLOR}
          borderRadius="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GlobeIcon />
        </Box>
        <Text
          fontWeight="800"
          fontSize={{ base: "20px", md: "26px" }}
          color="#0f1f17"
          letterSpacing="-0.02em"
        >
          Nexu
          <Text
            as="span"
            color={WEBSITE_THEME_COLOR}
            fontStyle="italic"
            fontFamily="'Georgia', serif"
          >
            Flow
          </Text>
        </Text>
      </Flex>

      <AccordionRoot
        value={value}
        onValueChange={(event) => setValue(event.value)}
        multiple
      >
        <VStack alignItems="stretch" gap="1">
          {SIDEBAR_ITEMS.map((sidebarItem) => (
            <SidebarItem key={sidebarItem.name} {...sidebarItem} />
          ))}
        </VStack>
      </AccordionRoot>
    </VStack>
  );
};
