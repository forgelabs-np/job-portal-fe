type SwiperNavigation = {
  slidePrev: () => void;
  slideNext: () => void;
};

export type NavigationProps = {
  swiper: SwiperNavigation | null;
  isBeginning: boolean;
  isEnd: boolean;
};
