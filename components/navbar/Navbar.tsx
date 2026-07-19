"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function Navbar() {
  const totalItems = useCartStore(
    (state) => state.getTotalItems()
  );

  const wishlistItems = useWishlistStore(
    (state) => state.wishlist
  );

  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4">

      <div className="flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-orange-500"
        >
          E-Shop
        </Link>

        {/* Menu ordinateur */}

        <div className="hidden md:flex items-center gap-5 lg:gap-6">

          <Link
            href="/"
            className="text-black hover:text-orange-500"
          >
            Accueil
          </Link>

          <Link
            href="/products"
            className="text-black hover:text-orange-500"
          >
            Produits
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-orange-500 font-semibold"
            >
              Admin
            </Link>
          )}

          {user && (
            <Link
              href="/profile/orders"
              className="text-orange-500 font-semibold"
            >
              Mes commandes
            </Link>
          )}

          {/* Wishlist */}

          <Link
            href="/wishlist"
            className="relative"
          >
            <FaHeart className="text-xl text-black hover:text-orange-500" />

            {wishlistItems?.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs rounded-full px-2">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Panier */}

          <Link
            href="/cart"
            className="relative"
          >
            <FaShoppingCart className="text-xl text-black hover:text-orange-500" />

            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Profil */}

          <Link href="/account">
            <FaUser className="text-xl text-black hover:text-orange-500" />
          </Link>

        </div>

        {/* Bouton menu mobile */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-2xl text-orange-500"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Menu téléphone */}

      {menuOpen && (
        <div className="md:hidden mt-5 flex flex-col gap-4 border-t pt-5">

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>

          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
          >
            Produits
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-orange-500 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {user && (
            <Link
              href="/profile/orders"
              className="text-orange-500 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Mes commandes
            </Link>
          )}

          <Link
            href="/wishlist"
            onClick={() => setMenuOpen(false)}
          >
            ❤️ Wishlist ({wishlistItems?.length || 0})
          </Link>

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
          >
            🛒 Panier ({totalItems})
          </Link>

          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
          >
            👤 Mon compte
          </Link>

        </div>
      )}

    </nav>
  );
}