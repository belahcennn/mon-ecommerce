"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // Génère un numéro de commande
  const orderNumber = Math.floor(
    100000 + Math.random() * 900000
  );

  // Vide le panier une seule fois à l'ouverture de la page
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

        <div className="text-6xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Merci pour votre commande !
        </h1>

        <p className="text-gray-600 text-lg">
          Votre commande a été enregistrée avec succès.
        </p>

        <div className="mt-8 bg-gray-100 rounded-xl p-6">

          <p className="text-gray-500">
            Numéro de commande
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            #{orderNumber}
          </p>

        </div>

        <div className="mt-8">

          <p className="font-semibold">
            Statut de la commande
          </p>

          <p className="text-yellow-600 text-lg mt-2">
            🟡 En préparation
          </p>

        </div>

        <p className="mt-8 text-gray-600">
          Nous vous contacterons prochainement
          pour confirmer votre commande et la
          livraison.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continuer les achats
          </Link>

          <Link
            href="/cart"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Voir le panier
          </Link>

        </div>

      </div>

    </main>
  );
}