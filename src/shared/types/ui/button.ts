import { StaticImageData } from "next/image";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export type SocialAuthButtonProps = {
  label: string;
  imageSrc: string | StaticImageData;
  width: number;
  height: number;
  onClick: () => void;
};

export type ButtonLoadingProps = {
  loading?: boolean;
  loadingText?: React.ReactNode;
};

export type ButtonProps = ChakraButtonProps & ButtonLoadingProps;

export type CartDeleteButtonProps = {
  onClick: VoidFunction;
  count: number;
  isLoading: boolean;
};

export type WishlistDeleteButtonProps = {
  onClick: VoidFunction;
  count: number;
  isLoading: boolean;
};
