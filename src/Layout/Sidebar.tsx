// "use client";
// import {
//   Box,
//   VStack,
//   HStack,
//   Icon,
//   Text,
//   Button,

//   // Divider,
// } from "@chakra-ui/react";
// import { useAuthStore } from "@/store";
// import { useRouter, usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import TokenService from "@/utils/token";
// import {
//   MdDashboard,
//   MdWork,
//   MdBusiness,
//   MdReviews,
//   MdLogout,
// } from "react-icons/md";
// import { HiCheckCircle } from "react-icons/hi";

// const navItems = {
//   admin: [
//     { label: "Dashboard", icon: MdDashboard, href: "/dashboard" },
//     { label: "Opportunities", icon: MdWork, href: "/opportunities" },
//     {
//       label: "Active Listings",
//       icon: HiCheckCircle,
//       href: "/opportunities/listings",
//       parent: "Opportunities",
//     },
//     {
//       label: "Destination Registry",
//       icon: MdBusiness,
//       href: "/opportunities/registry",
//       parent: "Opportunities",
//     },
//     { label: "Agency Network", icon: MdBusiness, href: "/agency-network" },
//     { label: "Review Queue", icon: MdReviews, href: "/review-queue" },
//   ],
//   agency: [
//     { label: "Dashboard", icon: MdDashboard, href: "/dashboard" },
//     { label: "My Listings", icon: MdWork, href: "/my-listings" },
//     { label: "Applications", icon: HiCheckCircle, href: "/applications" },
//   ],
// };

// export const Sidebar = () => {
//   const { user, role, logout } = useAuthStore();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [expandedParent, setExpandedParent] = useState<string | null>(null);

//   const currentNavItems = role === "gateway" ? navItems.admin : navItems.agency;

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   return (
//     <Box
//       w="240px"
//       bg="white"
//       borderRight="1px solid"
//       borderRightColor="gray.200"
//       h="100vh"
//       position="fixed"
//       left={0}
//       top={0}
//       overflowY="auto"
//       display="flex"
//       flexDirection="column"
//     >
//       {/* Logo */}
//       <HStack p={4} gap={2}>
//         <Box
//           w={8}
//           h={8}
//           bg="teal.600"
//           borderRadius="md"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           color="white"
//           fontWeight="bold"
//           fontSize="sm"
//         >
//           N
//         </Box>
//         <Text fontSize="lg" fontWeight="bold" color="teal.600">
//           NexuFlow
//         </Text>
//       </HStack>

//       {/* Navigation Items */}
//       <VStack gap={0} flex={1} align="stretch" px={2} py={4}>
//         {currentNavItems.map((item) => {
//           const isActive =
//             pathname === item.href || pathname.startsWith(item.href);
//           const isParentExpanded =
//             expandedParent === item.label ||
//             currentNavItems
//               .filter((i) => i.parent === item.label)
//               .some((i) => pathname === i.href);

//           return (
//             <Box key={item.href}>
//               <HStack
//                 px={3}
//                 py={2}
//                 cursor="pointer"
//                 borderRadius="md"
//                 bg={isActive ? "teal.50" : "transparent"}
//                 _hover={{ bg: "gray.50" }}
//                 onClick={() => {
//                   if (item.parent) {
//                     router.push(item.href);
//                   } else {
//                     const hasChildren = currentNavItems.some(
//                       (i) => i.parent === item.label,
//                     );
//                     if (hasChildren) {
//                       setExpandedParent(
//                         expandedParent === item.label ? null : item.label,
//                       );
//                     } else {
//                       router.push(item.href);
//                     }
//                   }
//                 }}
//                 gap={3}
//               >
//                 <Icon
//                   as={item.icon}
//                   w={5}
//                   h={5}
//                   color={isActive ? "teal.600" : "gray.600"}
//                 />
//                 <Text
//                   fontSize="sm"
//                   fontWeight={isActive ? "600" : "500"}
//                   color={isActive ? "teal.600" : "gray.700"}
//                   flex={1}
//                 >
//                   {item.label}
//                 </Text>
//               </HStack>

//               {/* Sub-items */}
//               {isParentExpanded &&
//                 currentNavItems
//                   .filter((i) => i.parent === item.label)
//                   .map((subItem) => {
//                     const isSubActive = pathname === subItem.href;
//                     return (
//                       <HStack
//                         key={subItem.href}
//                         px={6}
//                         py={2}
//                         cursor="pointer"
//                         borderRadius="md"
//                         bg={isSubActive ? "teal.50" : "transparent"}
//                         _hover={{ bg: "gray.50" }}
//                         onClick={() => router.push(subItem.href)}
//                         gap={3}
//                         ml={2}
//                       >
//                         <Icon
//                           as={subItem.icon}
//                           w={4}
//                           h={4}
//                           color={isSubActive ? "teal.600" : "gray.500"}
//                         />
//                         <Text
//                           fontSize="xs"
//                           fontWeight={isSubActive ? "600" : "500"}
//                           color={isSubActive ? "teal.600" : "gray.600"}
//                         >
//                           {subItem.label}
//                         </Text>
//                       </HStack>
//                     );
//                   })}
//             </Box>
//           );
//         })}
//       </VStack>

//       {/* <Divider borderColor="gray.200" /> */}

//       {/* Logout Button */}
//       <Button
//         variant="ghost"
//         w="full"
//         justifyContent="flex-start"
//         leftIcon={<MdLogout />}
//         onClick={handleLogout}
//         color="gray.700"
//         _hover={{ bg: "red.50", color: "red.600" }}
//         m={2}
//         mb={4}
//       >
//         Sign Out
//       </Button>
//     </Box>
//   );
// };
