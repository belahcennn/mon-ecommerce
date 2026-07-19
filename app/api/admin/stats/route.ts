import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

  try {


    // Toutes les commandes
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
    });



    // Ventes par mois

    const salesByMonth: any = {};


    orders.forEach((order) => {

      const month = new Date(order.createdAt)
        .toLocaleString("fr-FR", {
          month: "short",
        });


      if (!salesByMonth[month]) {

        salesByMonth[month] = 0;

      }


      salesByMonth[month] += order.total;


    });



    const salesData = Object.keys(
      salesByMonth
    ).map((month)=>({

      month,

      sales:
        salesByMonth[month],

    }));





    // Commandes par statut

    const statusData: any = {};


    orders.forEach((order)=>{


      if(!statusData[order.status]){

        statusData[order.status] = 0;

      }


      statusData[order.status]++;


    });



    const ordersStatus =
      Object.keys(statusData).map(
        (status)=>({

          status,

          count:
            statusData[status],

        })
      );





    // Produits les plus vendus

    const productsSales: any = {};



    orders.forEach((order)=>{


      order.items.forEach((item)=>{


        if(!productsSales[item.name]){

          productsSales[item.name] = 0;

        }


        productsSales[item.name] += item.quantity;


      });


    });





    const topProducts =
      Object.keys(productsSales)

      .map((name)=>({

        name,

        quantity:
          productsSales[name],

      }))

      .sort(
        (a,b)=>
          b.quantity - a.quantity
      )

      .slice(0,5);





    return NextResponse.json({

      salesData,

      ordersStatus,

      topProducts,

    });



  } catch(error){


    console.error(
      "STATS ERROR :",
      error
    );


    return NextResponse.json(

      {
        message:"Erreur statistiques"
      },

      {
        status:500
      }

    );


  }


}