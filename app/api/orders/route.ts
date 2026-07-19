import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ==============================
// Créer une commande
// ==============================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      items,
      total,
      address,
      paymentMethod,
      paymentStatus,
    } = body;


    console.log("USER ID :", userId);
    console.log("ITEMS :", items);



    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        {
          message: "Commande invalide",
        },
        {
          status: 400,
        }
      );
    }



    // Vérifier que l'utilisateur existe

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });


    if (!user) {
      return NextResponse.json(
        {
          message: "Utilisateur introuvable",
        },
        {
          status: 404,
        }
      );
    }



    // Vérifier que les produits existent

    const products = await prisma.product.findMany();



    for (const item of items) {

  const product = products.find(
    (p) => p.id === Number(item.id)
  );

  if (!product) {

    return NextResponse.json(
      {
        message: `Le produit ${item.name} est introuvable.`,
      },
      {
        status: 404,
      }
    );

  }

  if (product.stock <= 0) {

    return NextResponse.json(
      {
        message: `${product.name} est en rupture de stock.`,
      },
      {
        status: 400,
      }
    );

  }

  if (product.stock < Number(item.quantity)) {

    return NextResponse.json(
      {
        message: `Stock insuffisant pour ${product.name}. Il reste seulement ${product.stock} article(s).`,
      },
      {
        status: 400,
      }
    );

  }

}



    // Création de la commande

    const order = await prisma.order.create({

      data: {

        userId,

        total: Number(total),


        paymentMethod:
          paymentMethod || "COD",


        paymentStatus:
          paymentStatus || "UNPAID",



        name:
          address?.name || "",


        phone:
          address?.phone || "",


        city:
          address?.city || "",


        address:
          address?.address || "",




        items: {

          create: items.map((item: any) => ({

            productId: Number(item.id),

            name: item.name,

            quantity: Number(item.quantity),

            price: Number(item.price),

          })),

        },

      },


      include: {

        user: true,

        items: true,

      },

    });
// ==============================
// Diminuer le stock des produits
// ==============================

for (const item of items) {

  await prisma.product.update({

    where: {
      id: Number(item.id),
    },

    data: {
      stock: {
        decrement: Number(item.quantity),
      },
    },

  });

}



    return NextResponse.json(

      {

        message: "Commande créée avec succès",

        order,

      },

      {

        status: 201,

      }

    );



  } catch (error) {


    console.error(
      "CREATE ORDER ERROR :",
      error
    );


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




// ==============================
// Liste des commandes (Admin)
// ==============================

export async function GET() {

  try {


    const orders = await prisma.order.findMany({

      include: {

        user: true,

        items: true,

      },


      orderBy: {

        createdAt: "desc",

      },

    });



    return NextResponse.json(orders);



  } catch (error) {


    console.error(
      "GET ORDERS ERROR :",
      error
    );



    return NextResponse.json(

      {

        message:
          "Erreur récupération commandes",

      },

      {

        status: 500,

      }

    );

  }

}