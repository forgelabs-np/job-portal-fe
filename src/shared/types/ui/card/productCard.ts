export type ProductCardProps = {
  category?: string;
  image: string | null;
  title: string;
  description: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: string;
  hasAddToCart?: boolean;
  id?: string | number;
};
