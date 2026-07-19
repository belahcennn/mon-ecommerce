"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {

  const router = useRouter();


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);



  async function register(e: React.FormEvent) {

    e.preventDefault();


    setLoading(true);

    setMessage("");



    try {


      const response = await fetch("/api/register", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify({

          name,

          email,

          password,

        }),

      });



      const data = await response.json();



      if (response.ok) {


        setMessage("Compte créé avec succès ✅");


        setTimeout(() => {

          router.push("/login");

        }, 1500);



      } else {


        setMessage(data.message);


      }



    } catch (error) {


      setMessage("Erreur serveur");


    } finally {


      setLoading(false);


    }


  }



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <form

        onSubmit={register}

        className="bg-white p-8 rounded-xl shadow w-96"

      >


        <h1 className="text-3xl font-bold text-center mb-6">

          Créer un compte

        </h1>



        <input

          placeholder="Nom"

          className="border p-3 w-full rounded mb-4"

          value={name}

          onChange={(e) => setName(e.target.value)}

        />



        <input

          placeholder="Email"

          type="email"

          className="border p-3 w-full rounded mb-4"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

        />



        <input

          placeholder="Mot de passe"

          type="password"

          className="border p-3 w-full rounded mb-4"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

        />



        <button

          disabled={loading}

          className="bg-orange-500 hover:bg-orange-600 text-white w-full p-3 rounded"

        >

          {loading ? "Création..." : "Créer un compte"}

        </button>



        {message && (

          <p className="text-center mt-4">

            {message}

          </p>

        )}



        <p className="mt-5 text-center">


          Déjà un compte ?


          <Link

            href="/login"

            className="text-blue-600 ml-2"

          >

            Connexion

          </Link>


        </p>



      </form>


    </div>

  );

}