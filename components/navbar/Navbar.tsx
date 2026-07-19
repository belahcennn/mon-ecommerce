"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaBox } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  const totalItems = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <Link
            href="/"
            className="text-2xl font-bold text-orange-500"
          >
            E-SHOP
          </Link>

          <div className="flex flex-wrap items-center gap-4">

            <Link
              href="/"
              className="font-semibold hover:text-orange-500"
            >
              Accueil
            </Link>

            <Link
              href="/products"
              className="font-semibold hover:text-orange-500"
            >
              Produits
            </Link>

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="font-semibold text-orange-500"
              >
                Admin
              </Link>
            )}

            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 font-semibold"
              >
                <FaUser />
                Profil
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 font-semibold"
              >
                <FaUser />
                Connexion
              </Link>
            )}

            {user && (
              <Link
                href="/profile/orders"
                className="flex items-center gap-2 font-semibold"
              >
                <FaBox />
                Mes commandes
              </Link>
            )}

            <Link
              href="/cart"
              className="flex items-center gap-2 font-semibold"
            >
              <FaShoppingCart />
              Panier

              {totalItems > 0 && (
                <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Déconnexion
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}