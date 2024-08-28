import type { Horse, Prisma, Trip, Quote } from "@prisma/client";

import { prisma } from "~/db.server";

export function getHorse({
  id,
  quoteId,
  tripId,
}: Pick<Horse, "id"> & {
  quoteId?: Quote["id"];
  tripId?: Trip["id"];
}) {
  return prisma.horse.findFirst({
    where: {
      id,
      OR: [{ quoteId: quoteId ?? undefined }, { tripId: tripId ?? undefined }],
    },
  });
}

export function getHorseListItems({
  quoteId,
  tripId,
}: {
  quoteId?: Quote["id"];
  tripId?: Trip["id"];
}) {
  return prisma.horse.findMany({
    where: {
      OR: [{ quoteId: quoteId ?? undefined }, { tripId: tripId ?? undefined }],
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function createHorse(data: Prisma.HorseCreateInput) {
  return prisma.horse.create({ data });
}

export async function updateHorses(quoteId: string, horses: Horse[]) {
  const horseIds = horses.map((horse) => horse.id).filter(Boolean);

  // Delete horses that are not in the updated list
  await prisma.horse.deleteMany({
    where: {
      quoteId,
      id: {
        notIn: horseIds,
      },
    },
  });

  // Update existing horses and create new ones
  for (const horse of horses) {
    if (horse.id) {
      await prisma.horse.update({
        where: { id: horse.id },
        data: {
          name: horse.name,
          breed: horse.breed,
          gender: horse.gender,
          age: horse.age,
          height: horse.height,
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.horse.create({
        data: {
          name: horse.name,
          breed: horse.breed,
          gender: horse.gender,
          age: horse.age,
          height: horse.height,
          quoteId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }
}

export function deleteHorse({ id }: Pick<Horse, "id">) {
  return prisma.horse.deleteMany({
    where: { id },
  });
}

export function softDeleteHorse(horseId: Horse["id"]) {
  return prisma.horse.update({
      where: { id: horseId },
      data: { deletedAt: new Date() },
  });
}
