import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl md:text-6xl font-bold">
          Achetez les meilleurs produits
        </h1>

        <p className="mt-6 text-xl">
          Livraison rapide • Paiement sécurisé • Meilleurs prix
        </p>

        <Link
          href="/products"
          className="inline-block mt-10 bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Découvrir la boutique
        </Link>

      </div>
    </section>
  );
}