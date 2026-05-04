export type QuantityInputProps = {
  value: number;
  width?: string | number;
  onChange: (value: number) => void;
  minimum?: number;
  maximum?: number;
};
