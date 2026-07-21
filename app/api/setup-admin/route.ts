import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, setupCode } = await req.json();

    if (setupCode !== process.env.ADMIN_SETUP_CODE) {
      return NextResponse.json(
        { message: "Code incorrect" },
        { status: 403 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      message: "Compte administrateur créé",
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}