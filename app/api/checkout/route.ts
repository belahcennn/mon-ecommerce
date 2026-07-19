import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItem = {
  id: string;
  name?: string;
  price: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const {
      items,
      userId,
      couponCode,
    }: {
      items: CartItem[];
      userId: string;
      couponCode?: string;
    } = await req.json();

    // Vérification des données
    if (!items || items.length === 0 || !userId) {
      return NextResponse.json(
        {
          message: "Données manquantes",
        },
        {
          status: 400,
        }
      );
    }

    // Calcul du total
    const total = items.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );

    let discount = 0;

    // Vérification du coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: {
          code: couponCode.toUpperCase(),
        },
      });

      if (
        coupon &&
        coupon.active &&
        (!coupon.expiresAt || new Date() <= coupon.expiresAt)
      ) {
        if (coupon.type === "PERCENTAGE") {
          discount = (total * coupon.value) / 100;
        }

        if (coupon.type === "FIXED") {
          discount = coupon.value;
        }

        if (discount > total) {
          discount = total;
        }
      }
    }

    const finalTotal = Math.max(0, total - discount);

    const baseUrl =
      process.env.NEXT_PUBLIC_URL ||
      "http://localhost:3000";

    // Création session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "eur",

            product_data: {
              name: "Commande E-SHOP",
            },

            unit_amount: Math.round(finalTotal * 100),
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      metadata: {
        userId,
        items: JSON.stringify(items),
        couponCode: couponCode || "",
        discount: String(discount),
        total: String(total),
        finalTotal: String(finalTotal),
      },

      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error("STRIPE ERROR:", error);

    return NextResponse.json(
      {
        message: "Erreur Stripe",
      },
      {
        status: 500,
      }
    );
  }
}