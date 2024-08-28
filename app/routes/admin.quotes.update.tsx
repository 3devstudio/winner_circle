// admin.quotes.update.tsx
import { json, ActionFunction } from "@remix-run/node";
import type { Horse } from "@prisma/client";
import { updateQuote } from "~/models/quote.server";
import { updateHorses } from "~/models/horse.server";

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

  // Parse and map the required fields from form data
  [
    "timeFramePickUp",
    "createdAt",
    "updatedAt",
    "openedAt",
    "deletedAt",
  ].forEach((field) => {
    if (updatedData[field]) {
      const parsedDate = parseDate(updatedData[field]);
      if (parsedDate) updateData[field] = parsedDate;
    }
  });

  updateData.healthCert = updatedData.healthCert === "true";
  [
    "firstName",
    "lastName",
    "phoneNumber",
    "pickUpLocation",
    "dropOffLocation",
    "comments",
  ].forEach((field) => {
    updateData[field] = updatedData[field];
  });

  try {
    // Update the quote
    const updatedQuote = await updateQuote(quoteId, updateData);

    // Update the horses
    const horsesData = JSON.parse(updatedData.horses as string) as Horse[];
    await updateHorses(quoteId, horsesData);

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
