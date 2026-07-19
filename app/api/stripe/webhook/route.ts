import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";


const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);


const webhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET!;



export async function POST(req: Request) {


  try {


    const body = await req.text();


    const signature =
      req.headers.get(
        "stripe-signature"
      )!;



    const event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );





    if (
      event.type ===
      "checkout.session.completed"
    ) {


      const session =
        event.data.object as Stripe.Checkout.Session;



      const items = JSON.parse(
        session.metadata?.items || "[]"
      );



      console.log(
        "PAIEMENT REUSSI :",
        session.id
      );



      /*
        Création de la commande
      */


      await prisma.order.create({

        data: {


          total:
            session.amount_total! / 100,


          paymentMethod:
            "CARD",


          paymentStatus:
            "PAID",


          name:
            "Client Stripe",


          phone:
            "",


          city:
            "",


          address:
            "",


          status:
            "PROCESSING",



          userId:
            session.metadata?.userId || "",



          items: {


            create:

              items.map(
                (item:any)=>({


                  name:
                    item.name,


                  quantity:
                    item.quantity,


                  price:
                    item.price,


                  productId:
                    item.id,


                })
              )

          }


        }

      });



    }




    return NextResponse.json({
      received:true
    });



  } catch(error) {


    console.error(
      "WEBHOOK ERROR:",
      error
    );


    return new NextResponse(
      "Webhook Error",
      {
        status:400
      }
    );


  }


}