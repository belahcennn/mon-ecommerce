import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ==============================
// Récupérer les avis d'un produit
// ==============================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const productId = Number(searchParams.get("productId"));

    if (!productId) {
      return NextResponse.json(
        {
          message: "Produit invalide",
        },
        {
          status: 400,
        }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);

  } catch (error) {

    console.error("GET REVIEWS ERROR :", error);

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
// Ajouter un avis
// ==============================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      productId,
      rating,
      comment,
    } = body;

    if (
      !userId ||
      !productId ||
      !rating ||
      !comment
    ) {
      return NextResponse.json(
        {
          message: "Informations manquantes",
        },
        {
          status: 400,
        }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId: Number(productId),
        rating: Number(rating),
        comment,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(review);

  } catch (error) {

    console.error("CREATE REVIEW ERROR :", error);

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