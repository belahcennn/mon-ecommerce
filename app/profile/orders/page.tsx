"use client";

import { useEffect, useState } from "react";

type Order = {
id: number;
total: number;
status: string;
paymentMethod: string;
paymentStatus: string;
name: string;
phone: string;
city: string;
address: string;
createdAt: string;
};

export default function OrdersPage() {
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
loadOrders();
}, []);

async function loadOrders() {
try {
const user = JSON.parse(
localStorage.getItem("user") || "{}"
);

  if (!user.id) {
    setLoading(false);
    return;
  }

  const res = await fetch(
    `/api/orders?userId=${user.id}`
  );

  const data = await res.json();

  if (res.ok) {
    setOrders(data);
  }
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}

}

async function cancelOrder(orderId: number) {
const confirmed = confirm(
"Voulez-vous vraiment annuler cette commande ?"
);

if (!confirmed) {
  return;
}

try {
  const res = await fetch(
    `/api/orders/${orderId}/cancel`,
    {
      method: "PATCH",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    alert(
      data.message ||
        "Impossible d'annuler la commande"
    );

    return;
  }

  alert(
    "Commande annulée avec succès"
  );

  setOrders((previousOrders) =>
    previousOrders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "CANCELLED",
          }
        : order
    )
  );
} catch (error) {
  console.error(error);

  alert("Erreur serveur");
}

}

if (loading) {
return (
<main className="max-w-6xl mx-auto px-6 py-12">
<p className="text-lg">
Chargement de vos commandes...
</p>
</main>
);
}

return (
<main className="max-w-6xl mx-auto px-6 py-12">

  <h1 className="text-4xl font-bold text-orange-500 mb-8">
    📦 Mes commandes
  </h1>

  {orders.length === 0 ? (
    <div className="bg-white shadow rounded-xl p-8 text-center">
      <p className="text-gray-600 text-lg">
        Vous n'avez pas encore passé de commande.
      </p>
    </div>
  ) : (
    <div className="space-y-6">

      {orders.map((order) => (

        <div
          key={order.id}
          className="bg-white shadow rounded-xl p-6"
        >

          <div className="flex flex-col md:flex-row justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                Commande #{order.id}
              </h2>

              <p className="text-gray-600">
                Date :{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString("fr-FR")}
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-orange-500">
                {order.total.toFixed(2)} €
              </p>
            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <p className="font-semibold">
                Statut de la commande
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${
                  order.status === "PENDING"
                    ? "bg-yellow-500"
                    : order.status === "PROCESSING"
                    ? "bg-blue-500"
                    : order.status === "SHIPPED"
                    ? "bg-purple-500"
                    : order.status === "DELIVERED"
                    ? "bg-green-600"
                    : "bg-red-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div>
              <p className="font-semibold">
                Méthode de paiement
              </p>

              <p className="text-gray-600">
                {order.paymentMethod}
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Paiement
              </p>

              <p className="text-gray-600">
                {order.paymentStatus}
              </p>
            </div>

          </div>

          <div className="mt-5 border-t pt-5">

            <p className="font-semibold">
              Livraison
            </p>

            <p className="text-gray-600">
              {order.name}
            </p>

            <p className="text-gray-600">
              {order.phone}
            </p>

            <p className="text-gray-600">
              {order.city}, {order.address}
            </p>

          </div>

          {order.status === "PENDING" && (
            <button
              onClick={() =>
                cancelOrder(order.id)
              }
              className="mt-5 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold"
            >
              ❌ Annuler ma commande
            </button>
          )}

        </div>

      ))}

    </div>
  )}

</main>

);
}