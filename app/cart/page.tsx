"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
const {
items,
increaseQuantity,
decreaseQuantity,
removeFromCart,
clearCart,
getTotalPrice,
} = useCartStore();

const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);
const [finalTotal, setFinalTotal] =
useState<number | null>(null);

const [couponMessage, setCouponMessage] =
useState("");

const [loadingCoupon, setLoadingCoupon] =
useState(false);

const total = getTotalPrice();

async function applyCoupon() {
if (!couponCode.trim()) {
setCouponMessage(
"Veuillez entrer un code promo"
);
return;
}

try {
  setLoadingCoupon(true);
  setCouponMessage("");

  const res = await fetch(
    "/api/coupons/validate",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        code: couponCode.trim(),
        total,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    setDiscount(0);
    setFinalTotal(null);

    setCouponMessage(
      data.message ||
        "Code promo invalide"
    );

    return;
  }

  setDiscount(
    Number(data.discount) || 0
  );

  setFinalTotal(
    Number(data.finalTotal)
  );

  localStorage.setItem(
    "couponData",
    JSON.stringify({
      couponCode:
        couponCode.trim().toUpperCase(),

      discount:
        Number(data.discount) || 0,

      finalTotal:
        Number(data.finalTotal),
    })
  );

  setCouponMessage(
    "✅ Code promo appliqué avec succès"
  );
} catch (error) {
  console.error(
    "COUPON ERROR:",
    error
  );

  setCouponMessage(
    "Erreur lors de la validation du code promo"
  );
} finally {
  setLoadingCoupon(false);
}

}

async function handleStripePayment() {
try {
const user = JSON.parse(
localStorage.getItem("user") ||
"{}"
);

  if (!user.id) {
    alert(
      "Veuillez vous connecter avant de payer"
    );
    return;
  }

  const res = await fetch(
    "/api/checkout",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        items,

        userId: user.id,

        couponCode:
          couponCode || null,
      }),
    }
  );

  const data = await res.json();

  if (data.url) {
    window.location.href =
      data.url;
  } else {
    alert(
      data.message ||
        "Erreur paiement"
    );
  }
} catch (error) {
  console.error(error);

  alert(
    "Erreur pendant le paiement"
  );
}

}

function goToCheckout() {
localStorage.setItem(
"couponData",
JSON.stringify({
couponCode:
couponCode || null,

    discount,

    finalTotal:
      finalTotal ?? total,
  })
);

window.location.href =
  "/checkout";

}

if (items.length === 0) {
return (
<main className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-4xl font-bold text-orange-500 mb-8">
Mon Panier
</h1>

    <div className="bg-white rounded-xl shadow-md p-10 text-center">
      <p className="text-gray-600 text-lg mb-6">
        Votre panier est vide.
      </p>

      <Link
        href="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Continuer les achats
      </Link>
    </div>
  </main>
);

}

return (
<main className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-4xl font-bold text-orange-500 mb-8">
Mon Panier
</h1>

  <div className="space-y-6">
    {items.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row items-center gap-5 sm:justify-between"
      >
        <div className="flex items-center gap-5">
          <Image
            src={item.image}
            alt={item.name}
            width={90}
            height={90}
            className="rounded-lg"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {item.name}
            </h2>

            <p className="text-orange-500 font-bold">
              {item.price} €
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              decreaseQuantity(
                item.id
              )
            }
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>

          <span className="font-bold">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQuantity(
                item.id
              )
            }
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        <button
          onClick={() =>
            removeFromCart(item.id)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Supprimer
        </button>
      </div>
    ))}
  </div>

  <div className="mt-10 bg-white rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6">
      Code promo
    </h2>

    <div className="flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        value={couponCode}
        onChange={(e) =>
          setCouponCode(
            e.target.value.toUpperCase()
          )
        }
        placeholder="Exemple : WELCOME10"
        className="border border-gray-300 rounded-lg px-4 py-3 flex-1 min-w-[220px]"
      />

      <button
        type="button"
        onClick={applyCoupon}
        disabled={loadingCoupon}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
      >
        {loadingCoupon
          ? "Vérification..."
          : "Appliquer"}
      </button>
    </div>

    {couponMessage && (
      <p className="mb-4 font-semibold">
        {couponMessage}
      </p>
    )}

    <div className="border-t pt-5 space-y-2">
      <p className="text-lg">
        Sous-total :{" "}
        <span className="font-bold">
          {total.toFixed(2)} €
        </span>
      </p>

      {discount > 0 && (
        <p className="text-green-600 text-lg">
          Réduction : -
          {discount.toFixed(2)} €
        </p>
      )}

      <h2 className="text-2xl font-bold">
        Total :{" "}
        <span className="text-orange-500">
          {(
            finalTotal ?? total
          ).toFixed(2)}{" "}
          €
        </span>
      </h2>
    </div>

    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={clearCart}
        className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
      >
        Vider le panier
      </button>

      <button
        onClick={goToCheckout}
       className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        📦 Paiement à la livraison
      </button>

      <button
        onClick={handleStripePayment}
        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        💳 Payer par carte
      </button>
    </div>
  </div>
</main>

);
}