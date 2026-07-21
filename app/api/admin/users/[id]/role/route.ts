import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { role } = await req.json();

    if (role !== "USER" && role !== "ADMIN") {
      return NextResponse.json(
        { message: "Rôle invalide" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erreur lors de la modification du rôle" },
      { status: 500 }
    );
  }
}