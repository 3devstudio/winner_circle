import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "threeamigos@remix.run";
  const hashedPassword = await bcrypt.hash("threeamigos", 10);

  await prisma.user.create({
    data: {
      email,
      firstName: "Three",
      lastName: "Amigos",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });