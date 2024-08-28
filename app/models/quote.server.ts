import { prisma } from "~/db.server";
import { Prisma, Quote } from "@prisma/client";

export type { Quote } from "@prisma/client";

interface HorseCreateInput {
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
  trip?: Prisma.TripCreateNestedOneWithoutHorsesInput;
}

export interface QuoteCreateInputWithHorses {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pickUpLocation: string;
  dropOffLocation: string;
  timeFramePickUp: Date;
  comments: string;
  healthCert: boolean;
  openedAt: Date;
  horses: {
    create: HorseCreateInput[];
  };
}

// CREATE
export async function createQuote(data: QuoteCreateInputWithHorses) {
  try {
    return prisma.quote.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        pickUpLocation: data.pickUpLocation,
        dropOffLocation: data.dropOffLocation,
        timeFramePickUp: new Date(data.timeFramePickUp),
        healthCert: data.healthCert,
        comments: data.comments,
        openedAt: new Date(),
        horses: {
          create: data.horses.create,
        },
      },
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error("Failed to create quote");
  }
}

// READ
export async function getQuote(quoteId: string) {
  return prisma.quote.findUnique({
    where: { id: quoteId },
    include: { horses: true },
  });
}

export async function getAllQuotes() {
  return prisma.quote.findMany({
    include: { horses: true },
    orderBy: { createdAt: "desc" },
  });
}

// UPDATE
export async function updateQuote(quoteId: string, data: Partial<Quote>) {
  try {
    return prisma.quote.update({
      where: { id: quoteId },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error("Error updating quote:", error);
    throw new Error("Failed to update quote");
  }
}

// DELETE
export async function deleteQuote(quoteId: string) {
  return prisma.quote.delete({
    where: { id: quoteId },
  });
}

export async function softDeleteQuoteById(quoteId: Quote["id"]) {
  return prisma.quote.update({
    where: { id: quoteId },
    data: { deletedAt: new Date() },
  });
}

//Restore Quote by ID
export async function restoreQuoteById(quoteId: Quote["id"]) {
  return prisma.quote.update({
    where: { id: quoteId },
    data: { deletedAt: null },
  });
}
