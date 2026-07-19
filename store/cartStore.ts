import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;

  clearCart: () => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  // Ajouter un produit au panier
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ],
      };
    }),

  // Supprimer un produit
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.id !== id
      ),
    })),

  // Augmenter quantité
  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
    })),

  // Diminuer quantité
  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Vider le panier
  clearCart: () =>
    set({
      items: [],
    }),

  // Total prix
  getTotalPrice: () =>
    get().items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    ),

  // Nombre total produits
  getTotalItems: () =>
    get().items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    ),
}));