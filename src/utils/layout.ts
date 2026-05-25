import { SidebarItemProps } from "@/shared/types";

export const getInitialExpandedSidebarMenu = (
  sidebarItems: SidebarItemProps[],
): string[] => {
  const pathname = window.location.pathname;

  const activeMenu = sidebarItems.find((sidebarItem) =>
    sidebarItem.href ? pathname.startsWith(sidebarItem.href) : false,
  )?.name;

  if (activeMenu) return [activeMenu];

  return [];
};
