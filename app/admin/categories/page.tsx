"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LatestOrder = {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
};

type Stats = {
  revenue: number;
  orders: number;
  customers: number;
  stock: number;
  latestOrders: LatestOrder[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    revenue: 0,
    orders: 0,
    customers: 0,
    stock: 0,
    latestOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const res = await fetch("/api/admin/stats");

      if (!res.ok) {
        throw new Error("Erreur lors du chargement des statistiques");
      }

      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Chargement du Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-orange-500 mb-10">
        Dashboard Administrateur 📊
      </h1>

      {/* Cartes statistiques */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Chiffre d'affaires</p>
          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {stats.revenue} €
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Commandes</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Clients</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.customers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Produits en stock</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.stock}
          </h2>
        </div>

      </div>

      {/* Dernières commandes */}
      <div className="bg-white rounded-xl shadow mt-10 p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            📦 Dernières commandes
          </h2>

          <Link
            href="/admin/orders"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
          >
            Voir toutes
          </Link>

        </div>

        {stats.latestOrders.length === 0 ? (

          <p className="text-gray-500">
            Aucune commande.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b">

                <tr className="text-left">
                  <th className="py-3">ID</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {stats.latestOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b"
                  >

                    <td className="py-3">
                      #{order.id}
                    </td>

                    <td>
                      {order.user?.name || "Client"}
                    </td>

                    <td className="text-orange-500 font-bold">
                      {order.total} €
                    </td>

                    <td>
                      {order.status}
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}