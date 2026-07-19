import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Modifier un produit
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      name,
      description,
      price,
      image,
      stock,
      categoryId,
    } = body;


    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
        description,
        price: Number(price),
        image,
        stock: Number(stock),
        categoryId: Number(categoryId),
      },
    });


    return NextResponse.json(product);


  } catch (error) {

    return NextResponse.json(
      {
        error: "Erreur modification produit",
      },
      {
        status: 500,
      }
    );

  }
}



// Supprimer un produit (on l'utilisera après)
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;


    const product = await prisma.product.delete({
      where:{
        id:Number(id),
      },
    });


    return NextResponse.json(product);


  } catch(error){

    return NextResponse.json(
      {
        error:"Erreur suppression produit",
      },
      {
        status:500,
      }
    );

  }

}