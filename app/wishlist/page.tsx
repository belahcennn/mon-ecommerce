"use client";

import Image from "next/image";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ Mes favoris
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">
          Votre liste de favoris est vide.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="text-2xl font-bold text-blue-600 mt-3">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}