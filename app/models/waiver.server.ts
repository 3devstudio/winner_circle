import { prisma } from "~/db.server";
import { Waiver } from "@prisma/client";

export type { Waiver } from "@prisma/client";

interface Horse {
  id?: string;
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
}

export interface WaiverWithHorses {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pickUpDate: Date;
  pickUpAddress: string;
  pickUpCity: string;
  pickUpState: string;
  pickUpZip: string;
  pickUpContactName: string;
  pickUpContactPhone: string;
  dropOffAddress: string;
  dropOffCity: string;
  dropOffState: string;
  dropOffZip: string;
  dropOffContactName: string;
  dropOffContactPhone: string;
  agreedBidAmount: string;
  cogginsHealthCert: boolean;
  terms: boolean;
  comments?: string;
  horses: {
    create: Horse[];
  };
}

// CREATE
export async function createWaiver(data: WaiverWithHorses) {
  try {
    return prisma.waiver.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        pickUpDate: data.pickUpDate,
        pickUpAddress: data.pickUpAddress,
        pickUpCity: data.pickUpCity,
        pickUpState: data.pickUpState,
        pickUpZip: data.pickUpZip,
        pickUpContactName: data.pickUpContactName,
        pickUpContactPhone: data.pickUpContactPhone,
        dropOffAddress: data.dropOffAddress,
        dropOffCity: data.dropOffCity,
        dropOffState: data.dropOffState,
        dropOffZip: data.dropOffZip,
        dropOffContactName: data.dropOffContactName,
        dropOffContactPhone: data.dropOffContactPhone,
        agreedBidAmount: data.agreedBidAmount,
        cogginsHealthCert: data.cogginsHealthCert,
        terms: data.terms,
        comments: data.comments,
        horses: {
          create: data.horses.create,
        },
      },
    });
  } catch (error) {
    console.error("Error creating waiver:", error);
    throw new Error("Failed to create waiver");
  }
}

// READ
export async function getWaiverById(waiverId: string) {
  return prisma.waiver.findUnique({
    where: { id: waiverId },
  });
}

export async function getAllWaivers() {
  return prisma.waiver.findMany({
    include: {
      horses: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// UPDATE
export async function updateWaiver(
  waiverId: string,
  data: Partial<Waiver>,
  horses: Horse[],
) {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Check if the waiver exists and is not soft-deleted
      const existingWaiver = await prisma.waiver.findUnique({
        where: { id: waiverId },
        select: { id: true, deletedAt: true },
      });

      if (!existingWaiver || existingWaiver.deletedAt) {
        throw new Error("Waiver does not exist or is soft-deleted");
      }

      // Update the waiver itself
      const updatedWaiver = await prisma.waiver.update({
        where: { id: waiverId },
        data: {
          ...data,
        },
      });

      // Handle updating horses
      const existingHorses = await prisma.horse.findMany({
        where: {
          waiverId: waiverId,
          deletedAt: null,
        },
        select: { id: true },
      });

      const existingHorseIds = existingHorses.map((horse) => horse.id);
      const newHorseIds = horses
        .filter((horse) => horse.id)
        .map((horse) => horse.id);

      // Soft-delete horses that are not in the new list
      await prisma.horse.updateMany({
        where: {
          id: {
            in: existingHorseIds.filter((id) => !newHorseIds.includes(id)),
          },
        },
        data: {
          deletedAt: new Date(), // Mark as deleted
        },
      });

      // Update existing horses or create new ones
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
              deletedAt: null,
            },
          });
        } else {
          await prisma.horse.create({
            data: {
              waiverId: waiverId,
              name: horse.name,
              breed: horse.breed,
              gender: horse.gender,
              age: horse.age,
              height: horse.height,
            },
          });
        }
      }

      return updatedWaiver;
    });
  } catch (error) {
    console.error("Error updating waiver:", error);
    throw new Error("Failed to update waiver");
  }
}

// DELETE
export async function deleteWaiver(waiverId: string) {
  return prisma.waiver.delete({
    where: { id: waiverId },
  });
}

// Restore Waiver by ID
export async function restoreWaiverById(waiverId: Waiver["id"]) {
  return prisma.waiver.update({
    where: { id: waiverId },
    data: { deletedAt: null },
  });
}
