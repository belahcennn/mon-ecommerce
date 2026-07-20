import Hero from "@/components/hero/Hero";
import Categories from "@/components/categories/Categories";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import Promo from "@/components/promo/Promo";
import Features from "@/components/features/Features";
import Newsletter from "@/components/newsletter/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Hero />

      {/* Catégories populaires */}
      <Categories />

      {/* Produits en vedette */}
      <FeaturedProducts />

      <Promo />

      <Features />

      <Newsletter />

    </main>
  );
}