"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string | null;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        setUser(data.user);

      } catch (error) {
        router.push("/login");

      } finally {
        setLoading(false);
      }
    }

    getProfile();

  }, [router]);



  async function logout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.push("/login");

    } catch (error) {
      console.log("Erreur déconnexion");
    }
  }



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Chargement...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Mon Profil
        </h1>


        <div className="space-y-5">

          <div>
            <p className="text-gray-500">
              Nom
            </p>

            <p className="text-black font-semibold">
              {user?.name || "Non renseigné"}
            </p>
          </div>



          <div>
            <p className="text-gray-500">
              Email
            </p>

            <p className="text-black font-semibold">
              {user?.email}
            </p>
          </div>

        </div>



        <button
          onClick={logout}
          className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Déconnexion
        </button>


      </div>

    </div>
  );
}
