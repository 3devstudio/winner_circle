import type { Review, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export function getReview({
  id,
}: Pick<Review, "id">
) {
  return prisma.review.findFirst({
    where: { id }
  });
}

export function getAllReviews() {
  return prisma.review.findMany();
}

export async function createReview(data: Prisma.ReviewCreateInput) {
  return prisma.review.create({ data });
}

export function deleteReview({
  id,
}: Pick<Review, "id">
) {
  return prisma.review.deleteMany({
    where: { id }
  });
}