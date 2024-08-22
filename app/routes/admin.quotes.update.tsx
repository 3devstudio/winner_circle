import { json, ActionFunction } from "@remix-run/node";
import { prisma } from "~/db.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const quoteId = formData.get("quoteId") as string;

  const updatedData = Object.fromEntries(formData.entries()) as Record<
    string,
    FormDataEntryValue
  >;

  const updateData: Record<string, any> = {};

  const parseDate = (value: FormDataEntryValue | null): string | null => {
    if (typeof value === "string" && value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString();
      }
    }
    return null;
  };

  if (updatedData.timeFramePickUp) {
    const parsedTimeFramePickUp = parseDate(updatedData.timeFramePickUp);
    if (parsedTimeFramePickUp) {
      updateData.timeFramePickUp = parsedTimeFramePickUp;
    }
  }

  if (updatedData.createdAt) {
    const parsedCreatedAt = parseDate(updatedData.createdAt);
    if (parsedCreatedAt) {
      updateData.createdAt = parsedCreatedAt;
    }
  }

  if (updatedData.updatedAt) {
    const parsedUpdatedAt = parseDate(updatedData.updatedAt);
    if (parsedUpdatedAt) {
      updateData.updatedAt = parsedUpdatedAt;
    }
  }

  if (updatedData.openedAt) {
    const parsedOpenedAt = parseDate(updatedData.openedAt);
    if (parsedOpenedAt) {
      updateData.openedAt = parsedOpenedAt;
    }
  }

  if (updatedData.deletedAt) {
    const parsedDeletedAt = parseDate(updatedData.deletedAt);
    updateData.deletedAt = parsedDeletedAt !== null ? parsedDeletedAt : null;
  }

  if (updatedData.healthCert) {
    updateData.healthCert = updatedData.healthCert === "true";
  }

  updateData.firstName = updatedData.firstName;
  updateData.lastName = updatedData.lastName;
  updateData.phoneNumber = updatedData.phoneNumber;
  updateData.pickUpLocation = updatedData.pickUpLocation;
  updateData.dropOffLocation = updatedData.dropOffLocation;
  updateData.comments = updatedData.comments;
  updateData.horses = updatedData.horses;
  updateData.quoteId = updatedData.quoteId;

  console.log("updateData", updateData);

  try {
    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: updateData,
    });

    return json({
      success: true,
      message: "Quote updated successfully",
      updatedQuote,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating quote:", error.message);
      return json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error updating quote:", error);
      return json(
        { success: false, error: "Unexpected error" },
        { status: 500 },
      );
    }
  }
};
