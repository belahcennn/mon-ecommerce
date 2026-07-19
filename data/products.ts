export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    image: "/products/nike-air.jpg",
    category: "Chaussures",
    rating: 4.8,
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 1999,
    image: "/products/macbook.jpg",
    category: "Électronique",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Apple Watch",
    price: 399,
    image: "/products/watch.jpg",
    category: "Montres",
    rating: 4.7,
  },
  {
    id: 4,
    name: "headphone",
    price: 349,
    image: "/products/headphone.jpg",
    category: "Audio",
    rating: 4.9,
  },
];