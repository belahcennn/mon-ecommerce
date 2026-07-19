"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image: string;
  stock: number;

  category?: {
    id: number;
    name: string;
  } | null;
};

type Props = {
  product: Product;
};

export default function ProductCard({
  product,
}: Props) {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const isInWishlist = useWishlistStore(
    (state) =>
      state.isInWishlist(product.id)
  );

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      <Link
        href={`/product/${product.id}`}
      >
        <div className="relative w-full h-56">

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />

        </div>
      </Link>

      <div className="p-5">

        <h2 className="text-xl font-bold mb-2">
          {product.name}
        </h2>

        {product.category && (
          <p className="text-sm text-gray-500 mb-2">
            {product.category.name}
          </p>
        )}

        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <p className="text-orange-500 text-xl font-bold mb-4">
          {product.price.toFixed(2)} €
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Stock : {product.stock}
        </p>

        <div className="flex items-center gap-3">

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold"
          >
            <FaShoppingCart />

            {product.stock <= 0
              ? "Rupture de stock"
              : "Ajouter au panier"}
          </button>

          <button
            onClick={() =>
              toggleWishlist(product.id)
            }
            className={`p-3 rounded-lg border ${
              isInWishlist
                ? "text-red-500 border-red-500"
                : "text-gray-500 border-gray-300"
            }`}
          >
            <FaHeart />
          </button>

        </div>

      </div>

    </div>
  );
}