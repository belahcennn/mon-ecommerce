import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        message: "Erreur récupération produits",
      },
      {
        status: 500,
      }
    );
  }
}