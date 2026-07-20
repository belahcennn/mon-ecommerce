"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        const data = await response.json();

        if (response.ok) {
          setProducts(data.slice(0, 8));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-50">

      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-3xl font-bold">
            ⭐ Produits en vedette
          </h2>

          <Link
            href="/products"
            className="text-orange-500 font-semibold"
          >
            Voir tous les produits →
          </Link>

        </div>

        {loading && (
          <p>Chargement des produits...</p>
        )}

        {!loading && products.length === 0 && (
          <p>Aucun produit trouvé.</p>
        )}

        {!loading && products.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        )}

      </div>

    </section>
  );
}