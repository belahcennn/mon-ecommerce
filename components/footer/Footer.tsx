import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">


        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            E-SHOP
          </h2>

          <p className="mt-4 text-gray-300">
            Votre plateforme e-commerce
            pour acheter facilement vos produits.
          </p>
        </div>



        {/* Navigation */}
        <div>
          <h3 className="font-bold text-lg mb-4">
            Navigation
          </h3>

          <ul className="space-y-2">

            <li>
              <Link href="/">
                Accueil
              </Link>
            </li>

            <li>
              <Link href="/cart">
                Panier
              </Link>
            </li>

            <li>
              <Link href="/wishlist">
                Favoris
              </Link>
            </li>

          </ul>

        </div>



        {/* Informations */}
        <div>

          <h3 className="font-bold text-lg mb-4">
            Informations
          </h3>


          <ul className="space-y-2">

            <li>
              <Link href="/about">
                À propos
              </Link>
            </li>


            <li>
              <Link href="/contact">
                Contact
              </Link>
            </li>


            <li>
              <Link href="/privacy">
                Confidentialité
              </Link>
            </li>

          </ul>

        </div>



        {/* Réseaux sociaux */}
        <div>

          <h3 className="font-bold text-lg mb-4">
            Suivez-nous
          </h3>


          <div className="flex gap-4 text-2xl">

            <FaFacebook className="hover:text-orange-500 cursor-pointer"/>

            <FaInstagram className="hover:text-orange-500 cursor-pointer"/>

            <FaTwitter className="hover:text-orange-500 cursor-pointer"/>

          </div>


        </div>


      </div>



      <div className="border-t border-gray-700 text-center py-5 text-gray-400">

        © 2026 E-SHOP. Tous droits réservés.

      </div>


    </footer>
  );
}