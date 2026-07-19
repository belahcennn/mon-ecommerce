"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteProductButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Erreur lors de la suppression.");
      return;
    }

    alert("Produit supprimé avec succès !");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
    >
      Supprimer
    </button>
  );
}