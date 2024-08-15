import { prisma } from "~/db.server";
import type { Waiver } from "@prisma/client";

export interface WaiverCreateInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isUserContact: boolean;
  pickUpContactId?: string;
  dropOffContactId?: string;
  pickUpDate: Date;
  pickUpAddress: string;
  pickUpCity: string;
  pickUpState: string;
  pickUpZip: string;
  dropOffAddress: string;
  dropOffCity: string;
  dropOffState: string;
  dropOffZip: string;
  agreedBidAmount: string;
  cogginsHealthCert: boolean;
  terms: boolean;
  comments?: string;
  horses: any[];
}

// Function to create a new Waiver
export async function createWaiver(data: WaiverCreateInput) {
  try {
    return prisma.waiver.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        isUserContact: data.isUserContact,
        pickUpDate: data.pickUpDate,
        pickUpAddress: data.pickUpAddress,
        pickUpCity: data.pickUpCity,
        pickUpState: data.pickUpState,
        pickUpZip: data.pickUpZip,
        dropOffAddress: data.dropOffAddress,
        dropOffCity: data.dropOffCity,
        dropOffState: data.dropOffState,
        dropOffZip: data.dropOffZip,
        agreedBidAmount: data.agreedBidAmount,
        cogginsHealthCert: data.cogginsHealthCert,
        terms: data.terms,
        comments: data.comments,
      },
    });
  } catch (error) {
    console.error("Error creating waiver:", error);
    throw new Error("Failed to create waiver");
  }
}

// Function to get a single Waiver by ID
export async function getWaiverById(id: string): Promise<Waiver | null> {
  return prisma.waiver.findUnique({
    where: { id },
    include: {
      pickUpContact: true,
      dropOffContact: true,
    },
  });
}

// Function to get all Waivers
export async function getAllWaivers(): Promise<Waiver[]> {
  return prisma.waiver.findMany({
    include: {
      pickUpContact: true,
      dropOffContact: true,
    },
  });
}

// Function to update a Waiver by ID
export async function updateWaiver(id: string, data: Partial<Waiver>): Promise<Waiver> {
  return prisma.waiver.update({
    where: { id },
    data,
  });
}

// Function to delete a Waiver by ID
export async function deleteWaiver(id: string): Promise<Waiver> {
  return prisma.waiver.delete({
    where: { id },
  });
}