"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Order = {

  id: number;

  total: number;

  status: string;

  createdAt: string;

};



export default function OrdersPage() {


  const router = useRouter();


  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);




  useEffect(() => {


    const user = localStorage.getItem("user");


    if (!user) {

      router.push("/login");

      return;

    }


    const userData = JSON.parse(user);



    async function getOrders() {


      try {


        const response = await fetch(
          `/api/orders?userId=${userData.id}`
        );


        const data = await response.json();


        setOrders(data.orders || []);



      } catch (error) {


        console.log(error);


      } finally {


        setLoading(false);


      }


    }



    getOrders();



  }, [router]);





  if (loading) {


    return (

      <main className="min-h-screen flex items-center justify-center">

        Chargement...

      </main>

    );

  }





  return (

    <main className="max-w-5xl mx-auto px-6 py-12">


      <h1 className="text-4xl font-bold text-orange-500 mb-8">

        Mes commandes

      </h1>




      {orders.length === 0 ? (


        <div className="bg-white shadow rounded-xl p-8 text-center">


          <p className="text-gray-600 text-lg mb-5">

            Vous n'avez aucune commande.

          </p>



          <Link

            href="/"

            className="bg-orange-500 text-white px-6 py-3 rounded-lg"

          >

            Continuer les achats

          </Link>


        </div>


      ) : (


        <div className="space-y-5">


          {orders.map((order) => (


            <div

              key={order.id}

              className="bg-white shadow rounded-xl p-6"

            >


              <h2 className="text-xl font-bold">

                Commande #{order.id}

              </h2>



              <p>

                Total : {order.total} €

              </p>



              <p>

                Statut : {order.status}

              </p>



              <p className="text-gray-500">

                Date : {new Date(order.createdAt).toLocaleDateString()}

              </p>



            </div>


          ))}


        </div>


      )}



    </main>

  );

}