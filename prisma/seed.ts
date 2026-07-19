import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  console.log("Suppression des anciennes données...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("Création des catégories...");

  const chaussures = await prisma.category.create({
    data: { name: "Chaussures" },
  });

  const electronique = await prisma.category.create({
    data: { name: "Électronique" },
  });

  const montres = await prisma.category.create({
    data: { name: "Montres" },
  });

  const audio = await prisma.category.create({
    data: { name: "Audio" },
  });

  console.log("Création des produits...");

  await prisma.product.createMany({
    data: [
      {
        name: "Nike Air Max",
        description: "Chaussure Nike Air Max",
        price: 120,
        image: "/products/nike-air.jpg",
        stock: 50,
        categoryId: chaussures.id,
      },
      {
        name: "MacBook Pro",
        description: "Ordinateur Apple",
        price: 1999,
        image: "/products/macbook.jpg",
        stock: 20,
        categoryId: electronique.id,
      },
      {
        name: "Apple Watch",
        description: "Montre connectée Apple",
        price: 399,
        image: "/products/watch.jpg",
        stock: 35,
        categoryId: montres.id,
      },
      {
        name: "Headphone",
        description: "Casque audio",
        price: 349,
        image: "/products/headphone.jpg",
        stock: 40,
        categoryId: audio.id,
      },
    ],
  });

  console.log("Création de l'administrateur...");

  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@eshop.com",
      password,
      role: Role.ADMIN,
    },
  });

  console.log("Base de données remplie avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });