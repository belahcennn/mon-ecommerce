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

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max",
    description: "Chaussures Nike Air Max confortables et modernes.",
    price: 120,
    image: "/products/nike-air.jpg",
    stock: 10,

    category: {
      id: 1,
      name: "Chaussures",
    },

    rating: 4.5,
  },

  {
    id: 2,
    name: "MacBook Pro",
    description: "Ordinateur portable Apple MacBook Pro performant.",
    price: 1500,
    image: "/products/macbook.jpg",
    stock: 5,

    category: {
      id: 2,
      name: "Ordinateurs",
    },

    rating: 4.8,
  },

  {
    id: 3,
    name: "Apple Watch",
    description: "Montre connectée Apple avec plusieurs fonctionnalités.",
    price: 400,
    image: "/products/watch.jpg",
    stock: 8,

    category: {
      id: 3,
      name: "Montres",
    },

    rating: 4.6,
  },

  {
    id: 4,
    name: "Sony WH-1000XM5",
    description: "Casque audio Sony avec réduction de bruit.",
    price: 350,
    image: "/products/headphone.jpg",
    stock: 12,

    category: {
      id: 4,
      name: "Audio",
    },

    rating: 4.7,
  },
];