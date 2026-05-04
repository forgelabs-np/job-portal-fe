import { Swiper as SwiperType } from "swiper";

export type NavigationProps = {
  swiper: SwiperType | null;
  isBeginning: boolean;
  isEnd: boolean;
};
