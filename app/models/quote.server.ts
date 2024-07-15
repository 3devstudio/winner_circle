import type { Quote, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export function getQuote({
  id,
}: Pick<Quote, "id">
) {
  return prisma.quote.findFirst({
    where: { id }
  });
}

export function getAllQuotes() {
  return prisma.quote.findMany();
}

export async function createQuote(data: Prisma.QuoteCreateInput) {
  return prisma.quote.create({
    data
  });
}

export function deleteQuote({
  id,
}: Pick<Quote, "id">
) {
  return prisma.quote.deleteMany({
    where: { id }
  });
}