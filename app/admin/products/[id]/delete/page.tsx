"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(false);

  async function deleteProduct() {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Produit supprimé avec succès");
        router.push("/admin/products");
      } else {
        alert("Erreur lors de la suppression");
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
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-6">
          Supprimer le produit
        </h1>

        <p className="text-gray-600 mb-8">
          Cette action est irréversible.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={deleteProduct}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Suppression..." : "Oui, supprimer"}
          </button>

          <button
            onClick={() => router.push("/admin/products")}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </main>
  );
}