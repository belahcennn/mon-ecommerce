import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code, total } = await req.json();

    if (!code || total === undefined) {
      return NextResponse.json(
        {
          message: "Code promo et total obligatoires",
        },
        {
          status: 400,
        }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });

    if (!coupon) {
      return NextResponse.json(
        {
          message: "Code promo invalide",
        },
        {
          status: 404,
        }
      );
    }

    if (!coupon.active) {
      return NextResponse.json(
        {
          message: "Ce code promo est désactivé",
        },
        {
          status: 400,
        }
      );
    }

    if (
      coupon.expiresAt &&
      new Date() > coupon.expiresAt
    ) {
      return NextResponse.json(
        {
          message: "Ce code promo a expiré",
        },
        {
          status: 400,
        }
      );
    }

    let discount = 0;

    if (coupon.type === "PERCENTAGE") {
      discount = (Number(total) * coupon.value) / 100;
    }

    if (coupon.type === "FIXED") {
      discount = coupon.value;
    }

    if (discount > Number(total)) {
      discount = Number(total);
    }

    const finalTotal = Number(total) - discount;

    return NextResponse.json({
      message: "Code promo valide",
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
      },
      discount,
      finalTotal,
    });
  } catch (error) {
    console.error("COUPON VALIDATION ERROR:", error);

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