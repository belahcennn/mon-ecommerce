import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("ADMIN USERS ERROR:", error);

    return NextResponse.json(
      {
        message: "Erreur récupération utilisateurs",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        {
          message: "ID et rôle obligatoires",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    return NextResponse.json({
      message: "Rôle modifié avec succès",
      user,
    });
  } catch (error) {
    console.error("UPDATE USER ROLE ERROR:", error);

    return NextResponse.json(
      {
        message: "Erreur modification rôle",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "ID obligatoire",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Utilisateur supprimé",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      {
        message: "Erreur suppression utilisateur",
      },
      {
        status: 500,
      }
    );
  }
}