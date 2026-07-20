import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-4">
            E-SHOP
          </h2>

          <p className="text-gray-300">
            Votre plateforme e-commerce pour acheter vos produits préférés
            en ligne.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">
            Navigation
          </h3>

          <div className="flex flex-col gap-2 text-gray-300">
            <Link href="/">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">
            Contactez-nous
          </h3>

          <div className="text-gray-300 space-y-2">
            <p>📧 contact@eshop.com</p>
            <p>📞 +212 6 00 00 00 00</p>
            <p>📍 Maroc</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">
            Suivez-nous
          </h3>

          <div className="text-gray-300">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 E-SHOP. Tous droits réservés.
      </div>
    </footer>
  );
}