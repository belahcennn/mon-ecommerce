import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Créer les catégories
  const electronics = await prisma.category.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: "Électronique",
    },
  });

  const shoes = await prisma.category.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      name: "Chaussures",
    },
  });

  const furniture = await prisma.category.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      name: "Mobilier",
    },
  });

  const accessories = await prisma.category.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      name: "Accessoires",
    },
  });

  // Ajouter les produits
  await prisma.product.createMany({
    data: [
      // ÉLECTRONIQUE
      {
        name: "MacBook Pro",
        description: "Ordinateur portable Apple",
        price: 1999,
        image: "/products/macbook.jpg",
        stock: 10,
        categoryId: electronics.id,
      },

      {
        name: "Apple Watch",
        description: "Montre connectée Apple",
        price: 399,
        image: "/products/watch.jpg",
        stock: 15,
        categoryId: electronics.id,
      },

      {
        name: "Sony WH-1000XM5",
        description: "Casque audio Sony avec réduction de bruit",
        price: 349,
        image: "/products/headphone.jpg",
        stock: 20,
        categoryId: electronics.id,
      },

      {
        name: "iPhone",
        description: "Smartphone Apple",
        price: 999,
        image: "/products/iphone.jpg",
        stock: 10,
        categoryId: electronics.id,
      },

      {
        name: "Keyboard",
        description: "Clavier moderne",
        price: 80,
        image: "/products/keyboard.jpg",
        stock: 20,
        categoryId: electronics.id,
      },

      // CHAUSSURES
      {
        name: "Nike Air",
        description: "Chaussures Nike confortables",
        price: 120,
        image: "/products/nike-air.jpg",
        stock: 10,
        categoryId: shoes.id,
      },

      // MOBILIER
      {
        name: "Chair",
        description: "Chaise moderne et confortable",
        price: 150,
        image: "/products/chair.jpg",
        stock: 8,
        categoryId: furniture.id,
      },

      // ACCESSOIRES
      {
        name: "Bag",
        description: "Sac moderne et élégant",
        price: 90,
        image: "/products/bag.jpg",
        stock: 12,
        categoryId: accessories.id,
      },
    ],
  });

  console.log("✅ Produits ajoutés dans leurs catégories !");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });