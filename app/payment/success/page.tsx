"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";


export default function PaymentSuccessPage() {


  const clearCart = useCartStore(
    (state) => state.clearCart
  );


  const [message, setMessage] = useState(
    "Confirmation du paiement..."
  );


  useEffect(() => {


    async function confirmPayment() {


      const params = new URLSearchParams(
        window.location.search
      );


      const session_id =
        params.get("session_id");



      if(!session_id){

        setMessage(
          "Session Stripe introuvable"
        );

        return;

      }




      const res = await fetch(
        "/api/payment-success",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            session_id,

          }),

        }
      );



      const data = await res.json();




      if(res.ok){


        setMessage(
          "Votre commande a été enregistrée avec succès."
        );


        clearCart();


      }

      else {


        setMessage(
          data.message ||
          "Erreur lors de la validation du paiement"
        );


      }


    }



    confirmPayment();



  }, [clearCart]);






  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">


      <div className="bg-white p-10 rounded-xl shadow text-center">


        <div className="text-6xl mb-5">
          ✅
        </div>



        <h1 className="text-3xl font-bold text-green-600 mb-4">

          Paiement réussi !

        </h1>



        <p className="text-gray-600 mb-8">

          {message}

        </p>




        <Link

          href="/"

          className="bg-orange-500 text-white px-6 py-3 rounded-lg"

        >

          Retour à l'accueil

        </Link>



      </div>


    </div>

  );

}