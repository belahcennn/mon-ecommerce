"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string | null;
  };
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string;
  stock: number;
  category: {
    id: number;
    name: string;
  };
  reviews: Review[];
};

export default function ProductDetailsPage() {
  const params = useParams();

  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const isInWishlist = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/products/${productId}`
        );

        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error(
          "Erreur récupération produit:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="text-center py-20">
        <p className="text-xl">
          Chargement du produit...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">
          Produit introuvable
        </h1>

        <Link
          href="/products"
          className="text-orange-500"
        >
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* PRODUIT */}

      <div className="grid md:grid-cols-2 gap-12">

        {/* IMAGE */}

        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>

        {/* INFORMATIONS */}

        <div>

          <p className="text-orange-500 font-semibold">
            {product.category.name}
          </p>

          <h1 className="text-4xl font-bold mt-3">
            {product.name}
          </h1>

          <p className="text-orange-500 text-3xl font-bold mt-5">
            {product.price.toFixed(2)} €
          </p>

          <p className="text-black mt-6 leading-7">
            {product.description ||
              "Découvrez notre produit premium. Qualité supérieure et design moderne."}
          </p>

          <p className="text-gray-600 mt-4">
            Stock disponible : {product.stock}
          </p>

          {/* QUANTITÉ */}

          <div className="flex items-center gap-5 mt-8">

            <button
              onClick={() =>
                setQuantity(
                  Math.max(1, quantity - 1)
                )
              }
              className="border px-4 py-2 rounded-lg"
            >
              -
            </button>

            <span className="font-bold text-xl">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(
                  Math.min(
                    product.stock,
                    quantity + 1
                  )
                )
              }
              className="border px-4 py-2 rounded-lg"
            >
              +
            </button>

          </div>

          {/* BOUTONS */}

          <div className="flex gap-4 mt-8">

            <button
              disabled={product.stock <= 0}
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity,
                })
              }
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold"
            >
              {product.stock <= 0
                ? "Rupture de stock"
                : "Ajouter au panier"}
            </button>

            <button
              onClick={() =>
                toggleWishlist({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
              className="border rounded-lg px-5"
            >
              <FaHeart
                className={
                  isInWishlist
                    ? "text-red-500 text-xl"
                    : "text-gray-400 text-xl"
                }
              />
            </button>

          </div>

        </div>

      </div>

      {/* AVIS CLIENTS */}

      <div className="mt-16 border-t pt-8">

        <h2 className="text-3xl font-bold mb-6">
          ⭐ Avis des clients
        </h2>

        {product.reviews.length === 0 ? (

          <p className="text-gray-600">
            Aucun avis pour le moment.
          </p>

        ) : (

          <div className="space-y-5">

            {product.reviews.map((review) => (

              <div
                key={review.id}
                className="border rounded-xl p-5 shadow-sm"
              >

                <div className="flex justify-between">

                  <strong>
                    {review.user?.name ||
                      "Client"}
                  </strong>

                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>

                </div>

                <p className="mt-3 text-gray-700">
                  {review.comment}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}