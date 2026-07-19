import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {

  try {


    const cookie =
      req.headers
        .get("cookie");


    if (!cookie) {

      return NextResponse.json(
        {
          message: "Non connecté",
        },
        {
          status:401,
        }
      );

    }



    const userData =
      cookie
        .split(";")
        .find((c)=>c.trim().startsWith("user="));



    if (!userData) {

      return NextResponse.json(
        {
          message:"Utilisateur introuvable",
        },
        {
          status:401,
        }
      );

    }



    const user =
      JSON.parse(
        decodeURIComponent(
          userData.split("=")[1]
        )
      );



    const orders =
      await prisma.order.findMany({

        where:{
          userId:user.id,
        },


        include:{

          items:true,

        },


        orderBy:{
          createdAt:"desc",
        },

      });



    return NextResponse.json(orders);



  } catch(error) {


    console.error(
      "USER ORDERS ERROR:",
      error
    );


    return NextResponse.json(
      {
        message:"Erreur serveur",
      },
      {
        status:500,
      }
    );


  }

}