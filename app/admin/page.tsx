"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";


type Dashboard = {

  totalOrders:number;
  totalSales:number;
  totalProducts:number;
  totalUsers:number;

  lastOrders:any[];

  lowStockProducts:any[];

};



type Stats = {

  salesData:any[];

  ordersStatus:any[];

  topProducts:any[];

};



export default function AdminDashboard(){


  const [data,setData] =
    useState<Dashboard | null>(null);


  const [stats,setStats] =
    useState<Stats | null>(null);




  useEffect(()=>{


    async function loadData(){


      const dashboard =
        await fetch("/api/admin/dashboard");


      const dashboardJson =
        await dashboard.json();



      setData(dashboardJson);




      const stats =
        await fetch("/api/admin/stats");


      const statsJson =
        await stats.json();



      setStats(statsJson);


    }



    loadData();


  },[]);





  if(!data || !stats){

    return (

      <div className="p-8">

        Chargement dashboard...

      </div>

    );

  }




  return (

<div className="p-8">


<h1 className="text-4xl font-bold text-orange-500 mb-10">

Dashboard Admin 📊

</h1>



{/* Cartes */}


<div className="grid md:grid-cols-4 gap-6">



<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-gray-500">
Commandes
</h2>

<p className="text-3xl font-bold">
{data.totalOrders}
</p>

</div>




<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-gray-500">
Chiffre d'affaires
</h2>

<p className="text-3xl font-bold text-orange-500">
{data.totalSales} €
</p>

</div>




<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-gray-500">
Produits
</h2>

<p className="text-3xl font-bold">
{data.totalProducts}
</p>

</div>




<div className="bg-white shadow rounded-xl p-6">

<h2 className="text-gray-500">
Utilisateurs
</h2>

<p className="text-3xl font-bold">
{data.totalUsers}
</p>

</div>



</div>





{/* Graphique ventes */}


<div className="bg-white shadow rounded-xl p-6 mt-10">


<h2 className="text-2xl font-bold mb-6">

📈 Ventes par mois

</h2>



<ResponsiveContainer width="100%" height={300}>

<LineChart data={stats.salesData}>

<CartesianGrid />

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="sales"
/>


</LineChart>


</ResponsiveContainer>



</div>





{/* Statuts commandes */}


<div className="bg-white shadow rounded-xl p-6 mt-10">


<h2 className="text-2xl font-bold mb-6">

📦 Statut des commandes

</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={stats.ordersStatus}>


<CartesianGrid/>


<XAxis dataKey="status"/>


<YAxis/>


<Tooltip/>


<Bar dataKey="count"/>


</BarChart>


</ResponsiveContainer>



</div>





{/* Produits populaires */}


<div className="bg-white shadow rounded-xl p-6 mt-10">


<h2 className="text-2xl font-bold mb-6">

🏆 Produits les plus vendus

</h2>



<table className="w-full">


<thead className="bg-orange-500 text-white">


<tr>

<th className="p-3">
Produit
</th>

<th>
Ventes
</th>


</tr>


</thead>



<tbody>


{stats.topProducts.map((product)=>(


<tr
key={product.name}
className="border-b text-center"
>


<td className="p-3">

{product.name}

</td>


<td>

{product.quantity}

</td>


</tr>


))}


</tbody>


</table>


</div>






</div>


);


}