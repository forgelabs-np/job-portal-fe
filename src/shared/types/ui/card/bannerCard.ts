import { StaticImageData } from "next/image";

export type BannerCardProps = {
  direction?: "column" | "row";
  title: string;
  description: string;
  buttonTitle: string;
  redirectLink: string;
  background: string;
  imageUrl: StaticImageData | string;
};
