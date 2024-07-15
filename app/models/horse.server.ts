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
      OR: [
        { quoteId: quoteId ?? undefined },
        { tripId: tripId ?? undefined }
      ]
    }
  })
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
      OR: [
        { quoteId: quoteId ?? undefined },
        { tripId: tripId ?? undefined }
      ]
    },
    orderBy: { createdAt: "asc" }
  })
}

export async function createHorse(data: Prisma.HorseCreateInput) {
  return prisma.horse.create({ data });
}

export function deleteHorse({
  id,
}: Pick<Horse, "id">
) {
  return prisma.horse.deleteMany({
    where: { id }
  });
}