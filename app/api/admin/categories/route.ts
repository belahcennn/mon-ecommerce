import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Liste catégories

export async function GET(){

  try{


    const categories =
      await prisma.category.findMany({

        include:{
          products:true
        },

        orderBy:{
          id:"desc"
        }

      });



    return NextResponse.json(categories);



  }catch(error){


    console.error(error);


    return NextResponse.json(

      {
        message:"Erreur catégories"
      },

      {
        status:500
      }

    );


  }

}







// Ajouter catégorie

export async function POST(
  req:Request
){

  try{


    const {name} =
      await req.json();




    if(!name){

      return NextResponse.json(

        {
          message:"Nom obligatoire"
        },

        {
          status:400
        }

      );

    }





    const category =
      await prisma.category.create({

        data:{
          name
        }

      });





    return NextResponse.json(category);



  }catch(error){


    console.error(error);


    return NextResponse.json(

      {
        message:"Erreur création catégorie"
      },

      {
        status:500
      }

    );

  }

}