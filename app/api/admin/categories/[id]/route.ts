import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// ===============================
// GET UNE CATEGORIE
// ===============================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;


    const category =
      await prisma.category.findUnique({

        where: {
          id: Number(id),
        },

        include: {
          products: true,
        },

      });



    if (!category) {

      return NextResponse.json(
        {
          message: "Catégorie introuvable",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(category);



  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        message: "Erreur serveur",
      },
      {
        status: 500,
      }
    );

  }

}







// ===============================
// MODIFIER CATEGORIE
// ===============================

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {


  try {


    const { id } = await params;


    const { name } =
      await req.json();



    const category =
      await prisma.category.update({

        where: {
          id: Number(id),
        },


        data: {
          name,
        },

      });



    return NextResponse.json(category);



  } catch(error) {


    console.error(error);



    return NextResponse.json(
      {
        message:"Erreur modification catégorie",
      },
      {
        status:500,
      }
    );


  }

}








// ===============================
// SUPPRIMER CATEGORIE
// ===============================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {


  try {


    const { id } = await params;



    // Vérifier s'il y a des produits

    const products =
      await prisma.product.count({

        where:{
          categoryId:Number(id)
        }

      });




    if(products > 0){


      return NextResponse.json(

        {
          message:
          "Impossible de supprimer : cette catégorie contient des produits"
        },

        {
          status:400
        }

      );


    }






    await prisma.category.delete({

      where:{
        id:Number(id)
      }

    });





    return NextResponse.json({

      message:"Catégorie supprimée"

    });





  } catch(error) {


    console.error(error);



    return NextResponse.json(

      {
        message:"Erreur suppression catégorie"
      },

      {
        status:500
      }

    );


  }

}