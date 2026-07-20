export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image: string;
  stock: number;

  category: {
    id: number;
    name: string;
  };

  rating?: number;
};