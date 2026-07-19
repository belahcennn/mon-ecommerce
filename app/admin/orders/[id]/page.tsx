"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function OrderDetailsPage() {


  const params = useParams();

  const id = params.id;


  const [order, setOrder] = useState<any>(null);

  const [status, setStatus] = useState("");

  const [message, setMessage] = useState("");




  useEffect(() => {


    async function loadOrder(){


      const res = await fetch(
        `/api/admin/orders/${id}`
      );


      const data = await res.json();


      setOrder(data);

      setStatus(data.status);


    }


    if(id){

      loadOrder();

    }


  },[id]);






  async function updateStatus(){


    const res = await fetch(

      `/api/admin/orders/${id}`,

      {

        method:"PATCH",

        headers:{

          "Content-Type":"application/json",

        },

        body:JSON.stringify({

          status,

        }),

      }

    );



    const data = await res.json();



    setMessage(
      data.message
    );



    if(res.ok){

      setOrder({

        ...order,

        status

      });

    }


  }





  if(!order){


    return (

      <div className="p-8">

        Chargement commande...

      </div>

    );


  }






  return (

    <div className="p-8">


      <h1 className="text-4xl font-bold text-orange-500 mb-8">

        Commande #{order.id}

      </h1>




      <div className="bg-white shadow rounded-xl p-6 mb-8">


        <h2 className="text-2xl font-bold mb-4">

          Client

        </h2>


        <p>
          Nom : {order.user?.name}
        </p>


        <p>
          Email : {order.user?.email}
        </p>


      </div>





      <div className="bg-white shadow rounded-xl p-6 mb-8">


        <h2 className="text-2xl font-bold mb-4">

          Statut de la commande

        </h2>




        <p className="mb-3">

          Statut actuel :

          <span className="font-bold text-orange-500 ml-2">

            {order.status}

          </span>


        </p>





        <select

          value={status}

          onChange={(e)=>setStatus(e.target.value)}

          className="border rounded-lg p-3 mr-4"

        >

          <option value="PENDING">
            PENDING
          </option>

          <option value="PAID">
            PAID
          </option>

          <option value="SHIPPED">
            SHIPPED
          </option>

          <option value="DELIVERED">
            DELIVERED
          </option>

          <option value="CANCELLED">
            CANCELLED
          </option>


        </select>





        <button

          onClick={updateStatus}

          className="bg-orange-500 text-white px-5 py-3 rounded-lg"

        >

          Mettre à jour

        </button>




        {message && (

          <p className="mt-4 text-green-600">

            {message}

          </p>

        )}



      </div>







      <div className="bg-white shadow rounded-xl p-6">


        <h2 className="text-2xl font-bold mb-5">

          Produits

        </h2>




        {order.items.map((item:any)=>(


          <div

            key={item.id}

            className="border-b py-3"

          >

            <p className="font-semibold">

              {item.product.name}

            </p>


            <p>

              Quantité : {item.quantity}

            </p>


            <p>

              Prix : {item.price} €

            </p>


          </div>


        ))}



        <div className="mt-6 text-xl font-bold">


          Total :

          <span className="text-orange-500 ml-2">

            {order.total} €

          </span>


        </div>


      </div>




    </div>

  );


}