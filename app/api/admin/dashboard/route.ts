import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalOrders = await prisma.order.count();

    const orders = await prisma.order.findMany();

    const totalSales = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const totalProducts =
      await prisma.product.count();

    const totalUsers =
      await prisma.user.count();

    const lastOrders =
      await prisma.order.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    return NextResponse.json({
      totalOrders,
      totalSales,
      totalProducts,
      totalUsers,
      lastOrders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur dashboard",
      },
      {
        status: 500,
      }
    );
  }
}