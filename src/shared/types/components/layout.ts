import { ConfigType } from "@/types";
import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
  config: ConfigType;
};

export type NavItemProps = {
  href: string;
  menuName: string;
  subMenus?: NavItemProps[];
};

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SidebarItemProps = NavItemProps & {
  isLastChild: boolean;
};

export type LinkItemProps = {
  menuName: string;
  href: string;
  isChild?: boolean;
};
