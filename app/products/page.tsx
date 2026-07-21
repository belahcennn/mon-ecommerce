"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data/products";

function ProductsContent() {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        const data = await response.json();

        if (response.ok) {
          let filteredProducts = data;

          if (categoryId) {
            filteredProducts = data.filter(
              (product: Product) =>
                product.category.id === Number(categoryId)
            );
          }

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error(
          "Erreur récupération produits:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <p>Chargement des produits...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-orange-500 mb-10">
        🛍️ Produits
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">
          Aucun produit trouvé dans cette catégorie.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-6xl mx-auto px-6 py-12">
          <p>Chargement des produits...</p>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}