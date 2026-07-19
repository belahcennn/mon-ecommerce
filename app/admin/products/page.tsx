"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Erreur récupération produits:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: number) {
    const confirmed = confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Erreur lors de la suppression"
        );

        return;
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product.id !== id
        )
      );

      alert("Produit supprimé avec succès");
    } catch (error) {
      console.error(error);

      alert("Erreur serveur");
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        <p>Chargement des produits...</p>
      </main>
    );
  }

  return (
    <main className="p-8">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

        <h1 className="text-4xl font-bold text-orange-500">
          🛍️ Gestion des produits
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          ➕ Ajouter un produit
        </Link>

      </div>

      {products.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <p className="text-gray-600">
            Aucun produit trouvé.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-x-auto">

          <table className="w-full">

            <thead className="bg-orange-500 text-white">

              <tr>
                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Nom
                </th>

                <th className="p-4">
                  Prix
                </th>

                <th className="p-4">
                  Stock
                </th>

                <th className="p-4">
                  Catégorie
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-b text-center"
                >

                  <td className="p-4">
                    #{product.id}
                  </td>

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4 text-orange-500 font-bold">
                    {product.price.toFixed(2)} €
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    {product.category?.name || "-"}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        ✏️ Modifier
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        🗑️ Supprimer
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </main>
  );
}