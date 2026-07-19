import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



// Récupérer une commande par ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id:string }> }
){

  try {


    const { id } = await context.params;



    const order = await prisma.order.findUnique({

      where:{
        id:Number(id)
      },


      include:{

        user:true,

        items:true

      }

    });



    if(!order){

      return NextResponse.json(
        {
          message:"Commande introuvable"
        },
        {
          status:404
        }
      );

    }



    return NextResponse.json(order);



  } catch(error){


    console.error(error);


    return NextResponse.json(

      {
        message:"Erreur récupération commande"
      },

      {
        status:500
      }

    );

  }

}






// Modifier le statut d'une commande
export async function PUT(
  req:Request,
  context:{params:Promise<{id:string}>}
){

  try{


    const {id}=await context.params;


    const body=await req.json();


    const {
      status
    }=body;



    const order=await prisma.order.update({

      where:{
        id:Number(id)
      },


      data:{

        status

      }

    });



    return NextResponse.json(order);



  }catch(error){


    console.error(error);


    return NextResponse.json(

      {
        message:"Erreur modification commande"
      },

      {
        status:500
      }

    );

  }

}






// Supprimer une commande
export async function DELETE(
  req:Request,
  context:{params:Promise<{id:string}>}
){

  try{


    const {id}=await context.params;



    await prisma.orderItem.deleteMany({

      where:{
        orderId:Number(id)
      }

    });



    const order=await prisma.order.delete({

      where:{
        id:Number(id)
      }

    });



    return NextResponse.json({

      message:"Commande supprimée",

      order

    });



  }catch(error){


    console.error(error);


    return NextResponse.json(

      {
        message:"Erreur suppression commande"
      },

      {
        status:500
      }

    );

  }

}