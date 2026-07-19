import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";


export async function POST(req: Request) {

  try {

    const { session_id } = await req.json();



    if (!session_id) {

      return NextResponse.json(
        {
          message: "Session Stripe manquante",
        },
        {
          status: 400,
        }
      );

    }




    // Récupérer la session Stripe

    const session =
      await stripe.checkout.sessions.retrieve(
        session_id
      );




    // Vérifier le paiement

    if (
      session.payment_status !== "paid"
    ) {

      return NextResponse.json(
        {
          message: "Paiement non confirmé",
        },
        {
          status: 400,
        }
      );

    }




    const metadata = session.metadata;



    if (!metadata) {

      return NextResponse.json(
        {
          message: "Informations commande manquantes",
        },
        {
          status:400,
        }
      );

    }




    // Vérifier utilisateur

    const user =
      await prisma.user.findUnique({

        where:{
          id: metadata.userId,
        },

      });



    if(!user){

      return NextResponse.json(
        {
          message:"Utilisateur introuvable",
        },
        {
          status:404,
        }
      );

    }





    // Eviter les doublons

    const existingOrder =
      await prisma.order.findFirst({

        where:{

          paymentStatus:"PAID",

          userId:metadata.userId,

        },

      });



    if(existingOrder){

      return NextResponse.json({

        message:"Commande déjà enregistrée",

        order:existingOrder,

      });

    }






    // Création commande

    const items = JSON.parse(
  metadata.items
);



const order =
  await prisma.order.create({

    data:{


      userId: metadata.userId,


      total:
        session.amount_total! / 100,


      paymentMethod:"CARD",


      paymentStatus:"PAID",



      name: metadata.name,


      phone: metadata.phone,


      city: metadata.city,


      address: metadata.address,



      items:{


        create: items.map((item:any)=>({


          productId:Number(item.id),


          name:item.name,


          quantity:Number(item.quantity),


          price:Number(item.price),


        }))


      },


    },


  });





    return NextResponse.json({

      message:
        "Commande enregistrée",

      order,

    });





  } catch(error){


    console.error(
      "PAYMENT SUCCESS ERROR:",
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