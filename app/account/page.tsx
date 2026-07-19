"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function AccountPage() {


  const router = useRouter();


  const [user, setUser] = useState<any>(null);



  useEffect(() => {


    const savedUser = localStorage.getItem("user");


    if (!savedUser) {

      router.push("/login");

      return;

    }


    setUser(JSON.parse(savedUser));


  }, [router]);





  function logout() {


    localStorage.removeItem("user");


    router.push("/login");


  }





  if (!user) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <p className="text-xl">
          Chargement...
        </p>

      </main>

    );

  }





  return (

    <main className="max-w-5xl mx-auto px-6 py-12">


      <h1 className="text-4xl font-bold text-orange-500 mb-8">

        Mon compte

      </h1>




      <div className="bg-white rounded-xl shadow-md p-8">


        <h2 className="text-2xl font-bold mb-6">

          Informations personnelles

        </h2>




        <div className="space-y-3 text-lg">


          <p>

            <span className="font-semibold">
              Nom :
            </span>{" "}

            {user.name}

          </p>




          <p>

            <span className="font-semibold">
              Email :
            </span>{" "}

            {user.email}

          </p>




          <p>

            <span className="font-semibold">
              Rôle :
            </span>{" "}

            {user.role}

          </p>



        </div>





        <div className="mt-8 flex gap-4">


          <Link

            href="/account/orders"

            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"

          >

            Mes commandes

          </Link>





          <button

            onClick={logout}

            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"

          >

            Déconnexion

          </button>



        </div>



      </div>



    </main>

  );

}