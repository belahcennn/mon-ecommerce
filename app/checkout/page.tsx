"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
const router = useRouter();

const {
items,
getTotalPrice,
clearCart,
} = useCartStore();

const [form, setForm] = useState({
name: "",
phone: "",
city: "",
address: "",
});

const [loading, setLoading] = useState(false);

const [couponData] = useState(() => {
if (typeof window === "undefined") {
return {
couponCode: "",
discount: 0,
finalTotal: null,
};
}

const savedCoupon = localStorage.getItem(
  "couponData"
);

if (!savedCoupon) {
  return {
    couponCode: "",
    discount: 0,
    finalTotal: null,
  };
}

try {
  return JSON.parse(savedCoupon);
} catch {
  return {
    couponCode: "",
    discount: 0,
    finalTotal: null,
  };
}

});

const originalTotal = getTotalPrice();

const finalTotal =
couponData.finalTotal !== null &&
couponData.finalTotal !== undefined
? Number(couponData.finalTotal)
: originalTotal;

function handleChange(
e: React.ChangeEvent<HTMLInputElement>
) {
setForm({
...form,
[e.target.name]: e.target.value,
});
}

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

try {
  setLoading(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (!user.id) {
    alert(
      "Vous devez être connecté"
    );

    return;
  }

  const res = await fetch(
    "/api/orders",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId: user.id,

        items,

        total: finalTotal,

        address: form,

        paymentMethod: "COD",

        paymentStatus: "PENDING",

        couponCode:
          couponData.couponCode || null,

        discount:
          Number(couponData.discount) || 0,
      }),
    }
  );

  const data = await res.json();

  if (res.ok) {
    clearCart();

    localStorage.removeItem(
      "couponData"
    );

    router.push("/success");
  } else {
    alert(
      data.message ||
        "Erreur commande"
    );
  }
} catch (error) {
  console.error(error);

  alert("Erreur serveur");
} finally {
  setLoading(false);
}

}

return (
<main className="max-w-xl mx-auto px-6 py-12">
<h1 className="text-4xl font-bold text-orange-500 mb-8">
📦 Paiement à la livraison
</h1>

  <form
    onSubmit={handleSubmit}
    className="bg-white shadow rounded-xl p-6 space-y-5"
  >
    <input
      name="name"
      placeholder="Nom complet"
      value={form.name}
      onChange={handleChange}
      className="w-full border p-3 rounded"
      required
    />

    <input
      name="phone"
      placeholder="Téléphone"
      value={form.phone}
      onChange={handleChange}
      className="w-full border p-3 rounded"
      required
    />

    <input
      name="city"
      placeholder="Ville"
      value={form.city}
      onChange={handleChange}
      className="w-full border p-3 rounded"
      required
    />

    <input
      name="address"
      placeholder="Adresse"
      value={form.address}
      onChange={handleChange}
      className="w-full border p-3 rounded"
      required
    />

    <div className="space-y-2 border-t pt-4">
      <div className="text-gray-600">
        Total original :{" "}
        {originalTotal.toFixed(2)} €
      </div>

      {couponData.discount > 0 && (
        <div className="text-green-600">
          Réduction : -
          {Number(
            couponData.discount
          ).toFixed(2)} €
        </div>
      )}

      <div className="font-bold text-xl">
        Total à payer :{" "}
        <span className="text-orange-500">
          {finalTotal.toFixed(2)} €
        </span>
      </div>
    </div>

    <button
      disabled={loading}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
    >
      {loading
        ? "Validation..."
        : "Confirmer la commande"}
    </button>
  </form>
</main>

);
}