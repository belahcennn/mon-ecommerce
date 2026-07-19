"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function PaymentPage() {

  const cart = useCartStore(
    (state) => state.items
  );


  const clearCart = useCartStore(
    (state) => state.clearCart
  );


  const [paymentMethod, setPaymentMethod] =
    useState("COD");


  const [address, setAddress] = useState({

    name: "",
    phone: "",
    city: "",
    address: "",

  });




  const total = cart.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );





  async function handleSubmit(e: React.FormEvent) {
console.log("Le bouton fonctionne");
    e.preventDefault();



    const savedUser =
      localStorage.getItem("user");



    if (!savedUser) {

      alert(
        "Veuillez vous connecter avant de commander"
      );

      return;

    }



    const user =
      JSON.parse(savedUser);






    // ==========================
    // 💳 STRIPE
    // ==========================

    if(paymentMethod === "CARD"){


      const res = await fetch(
        "/api/checkout",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            userId:user.id,

            items:cart,

            address,

          }),


        }
      );



      const data =
        await res.json();




      if(data.url){

        window.location.href =
          data.url;

      }

      else {

        alert(
          "Erreur Stripe"
        );

      }


      return;

    }







    // ==========================
    // 💵 PAIEMENT LIVRAISON
    // ==========================


    const res =
      await fetch(
        "/api/orders",
        {


          method:"POST",


          headers:{

            "Content-Type":
            "application/json",

          },


          body:JSON.stringify({

            userId:user.id,

            items:cart,

            total,

            address,

            paymentMethod:"COD",

            paymentStatus:"UNPAID",


          }),


        }
      );



    const data =
      await res.json();




    if(res.ok){


      alert(
        "Commande confirmée avec succès 🛒"
      );


      clearCart();


      window.location.href =
        "/payment/success";


    }

    else {


      alert(
        data.message ||
        "Erreur commande"
      );


    }


  }







  return (

    <div className="min-h-screen bg-gray-100 py-10">


      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">


        <h1 className="text-3xl font-bold text-orange-500 mb-8">

          Paiement

        </h1>





        <form onSubmit={handleSubmit}>




          {/* Adresse livraison */}

          <h2 className="text-xl font-bold mb-4">

            Adresse de livraison

          </h2>





          <input

            className="w-full border p-3 mb-3 rounded"

            placeholder="Nom complet"

            required

            value={address.name}

            onChange={(e)=>

              setAddress({

                ...address,

                name:e.target.value,

              })

            }

          />





          <input

            className="w-full border p-3 mb-3 rounded"

            placeholder="Téléphone"

            required

            value={address.phone}

            onChange={(e)=>

              setAddress({

                ...address,

                phone:e.target.value,

              })

            }

          />





          <input

            className="w-full border p-3 mb-3 rounded"

            placeholder="Ville"

            required

            value={address.city}

            onChange={(e)=>

              setAddress({

                ...address,

                city:e.target.value,

              })

            }

          />





          <textarea

            className="w-full border p-3 mb-5 rounded"

            placeholder="Adresse complète"

            required

            value={address.address}

            onChange={(e)=>

              setAddress({

                ...address,

                address:e.target.value,

              })

            }

          />







          {/* MOYENS DE PAIEMENT */}

          <h2 className="text-xl font-bold mb-4">

            Mode de paiement

          </h2>




          <div className="space-y-4 mb-6">



            <label className="flex items-center gap-3 cursor-pointer">


              <input

                type="radio"

                value="COD"

                checked={
                  paymentMethod === "COD"
                }

                onChange={(e)=>

                  setPaymentMethod(
                    e.target.value
                  )

                }

              />


              💵 Paiement à la livraison


            </label>







            <label className="flex items-center gap-3 cursor-pointer">


              <input

                type="radio"

                value="CARD"

                checked={
                  paymentMethod === "CARD"
                }

                onChange={(e)=>

                  setPaymentMethod(
                    e.target.value
                  )

                }

              />


              💳 Carte bancaire (Stripe)


            </label>




          </div>






          {/* TOTAL */}

          <h2 className="text-xl font-bold">

            Total :

            <span className="text-orange-500 ml-2">

              {total} €

            </span>


          </h2>







          <button

            type="submit"

            disabled={
              cart.length === 0
            }


            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"


          >

            {
              paymentMethod === "CARD"

              ? "Payer par carte bancaire 💳"

              : "Confirmer la commande 💵"

            }


          </button>





        </form>


      </div>


    </div>

  );

}