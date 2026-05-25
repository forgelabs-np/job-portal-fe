import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
  config: Record<string, unknown>;
};

export type NavItemProps = {
  href?: string;
  name: string;
  subItems?: NavItemProps[];
};

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SidebarItemProps = NavItemProps & {
  isLastChild?: boolean;
  icon?: React.ReactNode;
  isChild?: boolean;
  isActive?: boolean;
  collapsed?: boolean;
  subItems?: SidebarItemProps[];
};

export type LinkItemProps = {
  menuName: string;
  href: string;
  isChild?: boolean;
  collapsed?: boolean;
};
