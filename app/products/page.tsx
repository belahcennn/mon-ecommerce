"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

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
        🛍️ Tous les produits
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">
          Aucun produit disponible.
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