import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {

  try {

    const {
      name,
      email,
      password
    } = await req.json();


    if (!name || !email || !password) {

      return NextResponse.json(
        {
          message: "Tous les champs sont obligatoires"
        },
        {
          status: 400
        }
      );

    }


    const existingUser = await prisma.user.findUnique({

      where: {
        email
      }

    });


    if (existingUser) {

      return NextResponse.json(
        {
          message: "Cet email existe déjà"
        },
        {
          status: 400
        }
      );

    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await prisma.user.create({

      data: {

        name,

        email,

        password: hashedPassword

      }

    });


    return NextResponse.json(

      {
        message: "Compte créé avec succès",

        user: {

          id: user.id,

          name: user.name,

          email: user.email

        }

      },

      {
        status: 201
      }

    );


  } catch (error) {


    console.error("REGISTER ERROR :", error);


    return NextResponse.json(

      {
        message: "Erreur serveur",
        error: String(error)
      },

      {
        status: 500
      }

    );


  }

}