import type { Trip, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export function getTrip({
  id,
}: Pick<Trip, "id">
) {
  return prisma.trip.findFirst({
    where: { id }
  });
}

export function getAllTrips() {
  return prisma.trip.findMany();
}

export async function createTrip(data: Prisma.TripCreateInput) {
  return prisma.trip.create({ data });
}

export function deleteTrip({
  id,
}: Pick<Trip, "id">
) {
  return prisma.trip.deleteMany({
    where: { id }
  });
}