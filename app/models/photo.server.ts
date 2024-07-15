import type { Photo, Prisma, Review } from "@prisma/client";

import { prisma } from "~/db.server";

export function getPhoto({
  id,
  reviewId,
}: Pick<Photo, "id"> & {
  reviewId?: Review["id"];
}) {
  return prisma.photo.findFirst({
    where: { id, reviewId }
  })
}

export function getPhotoListItems({
  reviewId,
}: {
  reviewId?: Review["id"];
}) {
  return prisma.photo.findMany({
    where: { reviewId: reviewId ?? undefined },
    orderBy: { createdAt: "asc" },  // Optional: To order by creation date
  });
}

export async function createPhoto(data: Prisma.PhotoCreateInput) {
  return prisma.photo.create({ data });
}

export function deletePhoto({
  id,
}: Pick<Photo, "id">
) {
  return prisma.photo.deleteMany({
    where: { id }
  });
}