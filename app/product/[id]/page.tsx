"use client";
import ReviewList from "@/components/reviews/ReviewList";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductDetailsPage() {
  const params = useParams();

  const productId = Number(params.id);

  const product = products.find(
    (item) => item.id === productId
  );


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


  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">
          Produit introuvable
        </h1>

        <Link
          href="/"
          className="text-orange-500"
        >
          Retour
        </Link>
      </div>
    );
  }


  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <div className="grid md:grid-cols-2 gap-12">


        {/* Image */}
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>



        {/* Informations */}
        <div>


          <p className="text-orange-500 font-semibold">
           {product.category.name}
          </p>


          <h1 className="text-4xl font-bold mt-3">
            {product.name}
          </h1>


          <p className="text-yellow-500 text-xl mt-3">
            ⭐ {product.rating}
          </p>


          <p className="text-orange-500 text-3xl font-bold mt-5">
            ${product.price}
          </p>



          <p className="text-black mt-6 leading-7">
            Découvrez notre produit premium.
            Qualité supérieure, design moderne,
            confortable et adapté à votre utilisation
            quotidienne.
          </p>



          {/* Quantité */}
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
                setQuantity(quantity + 1)
              }
              className="border px-4 py-2 rounded-lg"
            >
              +
            </button>

          </div>



          {/* Boutons */}
          <div className="flex gap-4 mt-8">


            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity,
                })
              }
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold"
            >
              Ajouter au panier
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


      {/* Informations supplémentaires */}
      <div className="mt-16 border-t pt-8">


        <h2 className="text-2xl font-bold">
          Description du produit
        </h2>


        <p className="mt-4 text-black">
          Produit disponible avec livraison rapide.
          Garantie qualité et satisfaction client.
        </p>


      </div>

<ReviewList />
    </main>
  );
}