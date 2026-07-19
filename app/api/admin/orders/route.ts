import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
try {
const body = await req.json();

const {
  userId,
  items,
  total,
  address,
  paymentMethod,
  paymentStatus,
  couponCode,
  discount,
} = body;

if (
  !userId ||
  !items ||
  items.length === 0
) {
  return NextResponse.json(
    {
      message:
        "Commande invalide",
    },
    {
      status: 400,
    }
  );
}

const user =
  await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

if (!user) {
  return NextResponse.json(
    {
      message:
        "Utilisateur introuvable",
    },
    {
      status: 404,
    }
  );
}

const products =
  await prisma.product.findMany();

for (const item of items) {
  const product =
    products.find(
      (p) =>
        p.id === Number(item.id)
    );

  if (!product) {
    return NextResponse.json(
      {
        message:
          `Le produit ${item.name} est introuvable.`,
      },
      {
        status: 404,
      }
    );
  }
}

const order =
  await prisma.order.create({
    data: {
      userId,

      total: Number(total),

      couponCode:
        couponCode || null,

      discount:
        Number(discount) || 0,

      paymentMethod:
        paymentMethod || "COD",

      paymentStatus:
        paymentStatus || "PENDING",

      name:
        address?.name || "",

      phone:
        address?.phone || "",

      city:
        address?.city || "",

      address:
        address?.address || "",

      items: {
        create: items.map(
          (item: any) => ({
            productId:
              Number(item.id),

            name: item.name,

            quantity:
              Number(item.quantity),

            price:
              Number(item.price),
          })
        ),
      },
    },

    include: {
      user: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });

return NextResponse.json(
  {
    message:
      "Commande créée avec succès",

    order,
  },
  {
    status: 201,
  }
);

} catch (error) {
console.error(
"CREATE ORDER ERROR:",
error
);

return NextResponse.json(
  {
    message:
      "Erreur serveur",
  },
  {
    status: 500,
  }
);

}
}

export async function GET() {
try {
const orders =
await prisma.order.findMany({
include: {
user: true,

      items: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

return NextResponse.json(
  orders
);

} catch (error) {
console.error(
"ADMIN ORDERS ERROR:",
error
);

return NextResponse.json(
  {
    message:
      "Erreur récupération commandes",
  },
  {
    status: 500,
  }
);

}
}