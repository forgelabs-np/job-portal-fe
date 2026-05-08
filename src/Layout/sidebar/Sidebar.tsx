"use client";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { ROUTES } from "@/constants/routes";
import { SidebarItemProps } from "@/shared/types";
import { Tooltip } from "@/shared/ui/tooltip";
import { useAuthStore } from "@/store";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiGlobe } from "react-icons/bi";
import { BsBagDash, BsHouse } from "react-icons/bs";
import {
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdLogout,
  MdSettingsApplications,
} from "react-icons/md";
import { GlobeIcon } from "../Footer";

const ADMIN_SIDEBAR_ITEMS: SidebarItemProps[] = [
  { name: "Dashboard", href: ROUTES.ADMIN_DASHBOARD, icon: <MdDashboard /> },
  { name: "Agency Network", href: ROUTES.AGENCY_NETWORK, icon: <BsHouse /> },
  {
    name: "Country Management",
    href: ROUTES.COUNTRY_MANAGEMENT,
    icon: <BiGlobe />,
  },
  {
    name: "Jobs",
    href: ROUTES.JOBS,
    icon: <BsBagDash />,
  },
  {
    name: "Applications",
    href: ROUTES.APPLICATIONS,
    icon: <MdSettingsApplications />,
  },
];

const AGENCY_SIDEBAR_ITEMS: SidebarItemProps[] = [
  { name: "Dashboard", href: ROUTES.AGENCY_DASHBOARD, icon: <MdDashboard /> },
  {
    name: "My Candidates",
    href: ROUTES.AGENCY_CANDIDATES,
    icon: <Users2 size={20} />,
  },
  { name: "Jobs", href: ROUTES.AGENCY_JOBS, icon: <BsBagDash /> },
];

interface NavItemProps {
  item: SidebarItemProps;
  collapsed: boolean;
  isActive: boolean;
}

const NavItem = ({ item, collapsed, isActive }: NavItemProps) => {
  const content = (
    <Flex
      align="center"
      gap={3}
      px={collapsed ? "0" : "4"}
      py="2.5"
      mx="2"
      borderRadius="10px"
      cursor="pointer"
      justify={collapsed ? "center" : "flex-start"}
      transition="all 0.2s ease"
      position="relative"
      bg={isActive ? "#b6e5d2" : "transparent"}
      color={isActive ? WEBSITE_THEME_COLOR : "black"}
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
      <Box
        fontSize="18px"
        flexShrink={0}
        opacity={isActive ? 1 : 0.8}
        css={{ "& > svg": { width: "18px", height: "18px" } }}
      >
        {item.icon}
      </Box>
      {!collapsed && (
        <Text
          fontSize="sm"
          letterSpacing="0.01em"
          whiteSpace="nowrap"
          overflow="hidden"
          opacity={collapsed ? 0 : 1}
          transition="opacity 0.15s ease"
        >
          {item.name}
        </Text>
      )}
    </Flex>
  );

  const wrapped = item.href ? (
    <Link href={item.href} style={{ width: "100%", display: "block" }}>
      {content}
    </Link>
  ) : (
    content
  );

  if (collapsed) {
    return (
      <Tooltip content={item.name} openDelay={100}>
        <Box width="full">{wrapped}</Box>
      </Tooltip>
    );
  }

  return <Box width="full">{wrapped}</Box>;
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  // const [collapsed, setCollapsed] = useState(false);
  const isAdmin = user?.roles?.includes("ADMIN");
  const sidebarItems = isAdmin ? ADMIN_SIDEBAR_ITEMS : AGENCY_SIDEBAR_ITEMS;
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const sidebarWidth = collapsed ? "72px" : "240px";

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      height="100vh"
      width={sidebarWidth}
      minWidth={sidebarWidth}
      zIndex={100}
      transition="width 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      overflow="hidden"
      flexShrink={0}
      bgGradient="linear(to-b, #0d4a2e, #0a3d24, #072d1a)"
      boxShadow="1px 0 5px rgba(0,0,0,0.25)"
      display="flex"
      flexDirection="column"
      bg={"white"}
    >
      <Flex
        align="center"
        justify={collapsed ? "center" : "space-between"}
        px={collapsed ? 0 : 4}
        py={5}
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.08)"
        flexShrink={0}
      >
        <Flex align="center" gap={2.5}>
          <Box
            w="36px"
            h="36px"
            bg={WEBSITE_THEME_COLOR}
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            border="1px solid rgba(255,255,255,0.2)"
            backdropFilter="blur(4px)"
            color={WEBSITE_THEME_COLOR}
          >
            <GlobeIcon />
          </Box>
          {!collapsed && (
            <Text
              fontWeight="800"
              fontSize="22px"
              letterSpacing="-0.03em"
              whiteSpace="nowrap"
            >
              Nexu
              <Text as="span" color={WEBSITE_THEME_COLOR} fontStyle="italic">
                Flow
              </Text>
            </Text>
          )}
        </Flex>

        {!collapsed && (
          <Button
            size="xs"
            variant="ghost"
            onClick={() => onToggle()}
            color="rgba(0, 0, 0, 0.5)"
            borderRadius="8px"
            minW="auto"
            p={1.5}
          >
            <MdChevronLeft size={18} />
          </Button>
        )}
      </Flex>

      {collapsed && (
        <Flex justify="center" pt={2} pb={1}>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => onToggle()}
            color="black"
            borderRadius="8px"
            minW="auto"
            p={1.5}
          >
            <MdChevronRight size={18} />
          </Button>
        </Flex>
      )}

      {!collapsed && (
        <Box px={6} pt={5} pb={2}>
          <Text
            fontSize="9px"
            fontWeight="700"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="rgba(255,255,255,0.3)"
          >
            Navigation
          </Text>
        </Box>
      )}

      {/* Nav items */}
      <VStack
        flex={1}
        alignItems="stretch"
        gap="1"
        px={collapsed ? 1 : 2}
        pt={collapsed ? 3 : 1}
        overflowY="auto"
        overflowX="hidden"
        css={{
          "&::-webkit-scrollbar": { width: "3px" },
          "&::-webkit-scrollbar-track": { bg: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bg: "rgba(255,255,255,0.1)",
            borderRadius: "4px",
          },
        }}
      >
        {sidebarItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            isActive={pathname === item.href}
          />
        ))}
      </VStack>

      <Box
        borderTop="1px solid"
        borderColor={"gray.200"}
        px={collapsed ? 1 : 3}
        py={3}
        flexShrink={0}
      >
        {/* {!collapsed && (
          <Flex align="center" gap={3} px={2} py={2} mb={1}>
            <Box
              w="32px"
              h="32px"
              borderRadius="full"
              bg={WEBSITE_THEME_COLOR}
              border="1px solid rgba(255,255,255,0.2)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Text fontSize="12px" fontWeight="700" color="white">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </Text>
            </Box>
            <Box overflow="hidden">
              <Text
                fontSize="13px"
                fontWeight="600"
                color={WEBSITE_THEME_COLOR}
              >
                {user?.name ?? "User"}
              </Text>
              <Text
                fontSize="10px"
                color={WEBSITE_THEME_COLOR}
                letterSpacing="0.05em"
                textTransform="uppercase"
              >
                {isAdmin ? "Admin" : "Agency"}
              </Text>
            </Box>
          </Flex>
        )} */}

        {collapsed ? (
          <Tooltip content="Logout">
            <Flex
              justify="center"
              align="center"
              py={2.5}
              borderRadius="10px"
              cursor="pointer"
              color={WEBSITE_THEME_COLOR}
              _hover={{ bg: "rgba(255,0,0,0.12)", color: "#ff6b6b" }}
              transition="all 0.2s"
              onClick={handleLogout}
            >
              <MdLogout size={18} />
            </Flex>
          </Tooltip>
        ) : (
          <Button
            w="full"
            size="sm"
            variant="ghost"
            onClick={handleLogout}
            color={WEBSITE_THEME_COLOR}
            borderRadius="10px"
            _hover={{ bg: "rgba(255,0,0,0.12)", color: "#ff6b6b" }}
            transition="all 0.2s"
          >
            <Flex align="center" gap={2}>
              <MdLogout size={15} />
              <Text fontSize="13px">Logout</Text>
            </Flex>
          </Button>
        )}
      </Box>
    </Box>
  );
};
