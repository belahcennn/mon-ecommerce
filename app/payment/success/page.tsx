"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [orderNumber] = useState(() =>
    Math.floor(100000 + Math.random() * 900000)
  );

  useEffect(() => {
    // Vide le panier une seule fois à l'ouverture de la page
    localStorage.removeItem("cart");
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Commande réussie 🎉
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Merci pour votre achat.
        </p>

        <p className="mt-3 text-gray-700">
          Votre numéro de commande est :
        </p>

        <p className="mt-2 text-2xl font-bold text-blue-600">
          #{orderNumber}
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Vous recevrez bientôt une confirmation de votre commande.
        </p>
      </div>
    </main>
  );
}