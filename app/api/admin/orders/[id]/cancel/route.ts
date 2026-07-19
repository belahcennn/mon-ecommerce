import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const orderId = Number(id);

    if (!orderId) {
      return NextResponse.json(
        {
          message: "ID de commande invalide",
        },
        {
          status: 400,
        }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
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

    if (order.status !== "PENDING") {
      return NextResponse.json(
        {
          message:
            "Cette commande ne peut plus être annulée",
        },
        {
          status: 400,
        }
      );
    }

    const updatedOrder =
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "CANCELLED",
        },
      });

    return NextResponse.json({
      message: "Commande annulée avec succès",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "CANCEL ORDER ERROR:",
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