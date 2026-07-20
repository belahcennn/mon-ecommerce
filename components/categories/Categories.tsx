"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");

        const data = await response.json();

        if (response.ok) {
          setCategories(data);
        }
      } catch (error) {
        console.error(
          "Erreur récupération catégories:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="py-16 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10">
          🛍️ Catégories populaires
        </h2>

        {loading && (
          <p className="text-gray-600">
            Chargement des catégories...
          </p>
        )}

        {!loading && categories.length === 0 && (
          <p className="text-gray-600">
            Aucune catégorie disponible.
          </p>
        )}

        {!loading && categories.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {categories.map((category) => (

              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="bg-orange-50 hover:bg-orange-500 hover:text-white transition rounded-xl p-8 text-center shadow-md"
              >

                <div className="text-4xl mb-4">
                  🛍️
                </div>

                <h3 className="font-bold text-lg">
                  {category.name}
                </h3>

              </Link>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}