import {
  Breadcrumb as ChakraBreadcrumb,
  type SystemStyleObject,
} from "@chakra-ui/react";

export type BreadcrumbRootProps = ChakraBreadcrumb.RootProps & {
  separator?: React.ReactNode;
  separatorGap?: SystemStyleObject["gap"];
};

export type BreadcrumbProps = {
  breadcrumb: { label: string; href: string }[];
};
