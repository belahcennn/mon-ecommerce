import FeaturedProducts from "@/components/products/FeaturedProducts";

export default function ShopPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        🛍️ Notre Boutique
      </h1>

      <p className="text-gray-600 mb-8">
        Découvrez tous nos produits disponibles.
      </p>

      <FeaturedProducts />
    </main>
  );
}