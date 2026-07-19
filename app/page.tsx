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

      <Categories />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Produits en vedette
        </h2>

        <FeaturedProducts />
      </section>

      <Promo />

      <Features />

      <Newsletter />
    </main>
  );
}