import { create } from "zustand";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistStore = {
  wishlist: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],

  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find((item) => item.id === product.id);

      if (exists) {
        return {
          wishlist: state.wishlist.filter(
            (item) => item.id !== product.id
          ),
        };
      }

      return {
        wishlist: [...state.wishlist, product],
      };
    }),

  isInWishlist: (id) => {
    return get().wishlist.some((item) => item.id === id);
  },
}));