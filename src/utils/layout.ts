import { SIDEBAR_ITEMS } from "@/Layout/sidebar/Sidebar";

export const getInitialExpandedSidebarMenu = (): string[] => {
  const pathname = window.location.pathname;

  const activeMenu = SIDEBAR_ITEMS.find((sidebarItem) =>
    pathname.startsWith(sidebarItem.href),
  )?.name;

  if (activeMenu) return [activeMenu];

  return [];
};
