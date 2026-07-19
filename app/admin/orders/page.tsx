"use client";


import { useEffect, useState } from "react";
import Link from "next/link";



export default function AdminOrdersPage(){


  const [orders,setOrders] = useState<any[]>([]);



  useEffect(()=>{


    async function loadOrders(){


      const res = await fetch(
        "/api/admin/orders"
      );


      const data = await res.json();


      setOrders(data);


    }


    loadOrders();


  },[]);





  return (

    <div className="p-8">


      <h1 className="text-4xl font-bold text-orange-500 mb-10">

        Gestion des commandes 📦

      </h1>




      <div className="bg-white shadow rounded-xl p-6">


        <table className="w-full">


          <thead className="bg-orange-500 text-white">

            <tr>

              <th className="p-3">
                ID
              </th>

              <th>
                Client
              </th>

              <th>
                Email
              </th>

              <th>
                Total
              </th>

              <th>
                Statut
              </th>

              <th>
                Date
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>



          <tbody>


          {orders.map((order)=>(


            <tr 
              key={order.id}
              className="border-b text-center"
            >

              <td className="p-3">
                #{order.id}
              </td>


              <td>
                {order.user?.name || "-"}
              </td>


              <td>
                {order.user?.email || "-"}
              </td>


              <td>
                {order.total} €
              </td>


              <td>
                {order.status}
              </td>


              <td>
                {new Date(order.createdAt)
                .toLocaleDateString()}
              </td>


              <td>

                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-orange-500 font-semibold"
                >
                  Voir
                </Link>


              </td>


            </tr>


          ))}


          </tbody>


        </table>


      </div>


    </div>

  );


}