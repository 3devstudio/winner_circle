// /Users/connorkelly/Documents/winner_circle/src/quote.server.ts
import { prisma } from "~/db.server";
import { Prisma } from "@prisma/client"; // Correct the import

interface HorseCreateInput {
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
  trip: Prisma.TripCreateNestedOneWithoutHorsesInput; // Use Prisma namespace for the type
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

// Function to create a new quote
export async function createQuote(data: QuoteCreateInputWithHorses) {
  try {
    // Validate input data
    data.horses.create.forEach((horse, index) => {
      if (!horse.name) {
        throw new Error(`Horse at index ${index} is missing the name property.`);
      }
    });

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

// Function to delete a quote by ID
export async function deleteQuote(quoteId: string) {
  return prisma.quote.delete({
    where: { id: quoteId },
  });
}

// Function to get a quote by ID
export async function getQuote(quoteId: string) {
  return prisma.quote.findUnique({
    where: { id: quoteId },
    include: { horses: true },
  });
}

// Function to get all quotes
export async function getAllQuotes() {
  return prisma.quote.findMany({
    include: { horses: true },
    orderBy: { createdAt: "desc" },
  });
}