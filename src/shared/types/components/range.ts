export type RangeSliderProps = {
  min: number;
  max: number;
  defaultValue: [number, number];
  onChange?: (values: [number, number]) => void;
};

export type RangeSliderType = {
  value: number[];
};
