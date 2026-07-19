"use client";

import Link from "next/link";


export default function PaymentCancelPage(){

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">


      <div className="bg-white p-10 rounded-xl shadow text-center">


        <div className="text-6xl mb-5">
          ❌
        </div>



        <h1 className="text-3xl font-bold text-red-600 mb-4">

          Paiement annulé

        </h1>




        <p className="text-gray-600 mb-8">

          Votre paiement n'a pas été effectué.
          Vous pouvez réessayer.

        </p>




        <Link

        href="/payment"

        className="bg-orange-500 text-white px-6 py-3 rounded-lg"

        >

          Retour au paiement

        </Link>




      </div>


    </div>

  );

}