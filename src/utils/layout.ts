import { SidebarItemProps } from "@/shared/types";

export const getInitialExpandedSidebarMenu = (
  sidebarItems: SidebarItemProps[],
): string[] => {
  const pathname = window.location.pathname;

  const activeMenu = sidebarItems.find((sidebarItem) =>
    pathname.startsWith(sidebarItem.href),
  )?.name;

  if (activeMenu) return [activeMenu];

  return [];
};
