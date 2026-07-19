import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// ==============================
// Récupérer une commande par ID
// ==============================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;


    const order = await prisma.order.findUnique({

      where: {
        id: Number(id),
      },


      include: {

        user: true,


        items: {

          include: {

            product: true,

          },

        },

      },

    });



    if (!order) {

      return NextResponse.json(

        {
          message: "Commande introuvable",
        },

        {
          status: 404,
        }

      );

    }



    return NextResponse.json(order);



  } catch(error) {


    console.error(
      "GET ORDER ERROR:",
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






// ==============================
// Modifier le statut commande
// ==============================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {


    const { id } = await params;


    const { status } =
      await req.json();



    const order =
      await prisma.order.update({

        where: {

          id: Number(id),

        },


        data: {

          status,

        },

      });



    return NextResponse.json({

      message:
        "Statut modifié avec succès",

      order,

    });



  } catch(error) {


    console.error(
  "UPDATE ORDER ERROR:",
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